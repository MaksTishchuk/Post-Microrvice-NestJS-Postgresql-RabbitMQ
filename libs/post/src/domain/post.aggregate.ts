import {IPost} from "@lib/post/domain/post.interface";
import {PostServices} from "@lib/post/domain/services";
import {IsBoolean, IsNotEmpty, IsNumber, IsString, validateSync} from "class-validator";
import {Exclude} from "class-transformer";

export class PostAggregate extends PostServices implements IPost {

  @IsNumber()
  id: number

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsNumber()
  authorId: number

  @IsBoolean()
  @Exclude()
  isPublished = false

  @IsString()
  createdAt = new Date().toISOString()

  @IsString()
  updatedAt = new Date().toISOString()

  private constructor() {
    super()
  }

  // Make our own constructor, because this class must be singleton
  static create(post: Partial<IPost>) {
    const _post =  new PostAggregate()
    Object.assign(_post, post)
    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt
    const errors = validateSync(_post, { whitelist: true })   // whitelist - только те поля, которые относятся к нашему классу
    if (!!errors.length) {
      throw new Error('Post not valid')
    }
    return _post
  }
}