import {IPost, PostAggregate} from "@lib/post";
import {PaginationDto} from "@lib/shared/dto";

export abstract class PostRepository {
  abstract save(post: IPost): Promise<PostAggregate>
  abstract findOne(id: number): Promise<PostAggregate | null>
  abstract findAll(pagination: PaginationDto): Promise<{posts: PostAggregate[], count: number}>
  abstract delete(id: number): Promise<boolean>
}
