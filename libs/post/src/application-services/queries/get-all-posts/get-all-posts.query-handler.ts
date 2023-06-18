import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {PostAggregate} from "@lib/post";
import {PostRepository} from "@lib/post/providers";
import {Logger} from "@nestjs/common";
import {GetAllPostsQuery} from "@lib/post/application-services/queries/get-all-posts/get-all-posts.query";

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsQueryHandler implements IQueryHandler<GetAllPostsQuery, {posts: PostAggregate[], count: number}> {
  private readonly logger = new Logger(GetAllPostsQueryHandler.name)

  constructor(private readonly postRepository: PostRepository) {}

  async execute({pagination}: GetAllPostsQuery): Promise<{posts: PostAggregate[], count: number}> {
    const {posts, count} = await this.postRepository
      .findAll(pagination)
      .catch(err => {
        this.logger.error(err)
        return {posts: [], count: 0}
      })
    return {
      posts: posts,
      count: count
    }
  }

}
