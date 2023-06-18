import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {PostAggregate} from "@lib/post";
import {PostRepository} from "@lib/post/providers";
import {Logger} from "@nestjs/common";
import {GetAllPostsQuery} from "@lib/post/application-services/queries/get-all-posts/get-all-posts.query";

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsQueryHandler implements IQueryHandler<GetAllPostsQuery, [[PostAggregate], number]> {
  private readonly logger = new Logger(GetAllPostsQueryHandler.name)

  constructor(private readonly postRepository: PostRepository) {}

  async execute({pagination}: GetAllPostsQuery): Promise<[[PostAggregate], number]> {
    const [data, count] = await this.postRepository
      .findAll(pagination)
      .catch(err => {
        this.logger.error(err)
        return [[], 0]
      })
    return [data, count] as [[PostAggregate], number]
  }

}
