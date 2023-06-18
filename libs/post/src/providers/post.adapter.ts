import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {PostRepository} from "@lib/post/providers/post.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "@lib/entities";
import {FindManyOptions, Repository} from "typeorm";
import {IPost, PostAggregate} from "@lib/post";
import {PaginationDto} from "@lib/shared/dto";
import {plainToInstance} from "class-transformer";

@Injectable()
export class PostAdapter implements PostRepository {
  private readonly logger = new Logger(PostAdapter.name)

  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
  ) {}

  async save(post: IPost): Promise<PostAggregate> {
    // update or create

    if (post?.id) {
      const existsPost = await this.findOne(post.id)
      if (!existsPost) {
        throw new NotFoundException(`Post by id ${post.id} not found!`)
      }
      const {id, ...toUpdate} = post
      await this.postRepository.update({id}, toUpdate)
      return this.findOne(post.id)
    }
    const savedPost = await this.postRepository.save(post)
    return PostAggregate.create(savedPost)
  }

  async findOne(id: number): Promise<PostAggregate> {
    const existsPost = await this.postRepository.findOneBy({id}).catch(err => {
      this.logger.error(err)
      return null
    })
    if (!existsPost) {
      throw new NotFoundException(`Post by id ${id} not found!`)
    }
    return PostAggregate.create(existsPost)
  }

  async findAll(pagination: PaginationDto): Promise<{posts: PostAggregate[], count: number}> {
    // получим инстанс с дефолтным полями, если не были переданы
    const { limit: take, offset: skip } = plainToInstance(PaginationDto, pagination)
    const options: FindManyOptions<PostEntity> = {
      where: {
        isPublished: true
      },
      take,
      skip,
      order: {
        createdAt: 'DESC'
      }
    }
    const [data, count] = await this.postRepository.findAndCount(options).catch(err => {
      this.logger.error(err)
      return [[], 0] as [PostEntity[], number]
    })
    return {
      posts: data.map(post => PostAggregate.create(post)),
      count
    }
  }


  async delete(id: number): Promise<boolean> {
    const result = await this.postRepository.delete({id}).catch(err => {
      this.logger.error(err)
      return false
    })
    return !!result
  }
}