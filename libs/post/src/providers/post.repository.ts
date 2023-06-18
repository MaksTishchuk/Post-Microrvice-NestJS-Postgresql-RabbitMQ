import {IPost, PostAggregate} from "@lib/post";

export abstract class PostRepository {
  abstract save(post: IPost): Promise<PostAggregate>
  abstract findOne(id: number): Promise<PostAggregate | null>
  abstract findAll(): Promise<[[PostAggregate], number]>
  abstract delete(id: number): Promise<boolean>
}
