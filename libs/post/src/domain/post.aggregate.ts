import {IPost} from "@lib/post/domain/post.interface";
import {PostServices} from "@lib/post/domain/services";
import {IsBoolean, IsNotEmpty, IsString, validateSync} from "class-validator";
import {Exclude} from "class-transformer";
import {DomainError} from "@lib/errors";
import * as uuid from 'uuid'

export class PostAggregate extends PostServices implements IPost {

  @IsString()
  id: string = uuid.v4()

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsNotEmpty()
  authorId: string

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

  static create(post: Partial<IPost>) {
    const _post =  new PostAggregate()
    Object.assign(_post, post)
    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt
    const errors = validateSync(_post, { whitelist: true })   // whitelist - только те поля, которые относятся к нашему классу
    if (!!errors.length) {
      throw new DomainError(errors, 'Post not valid')
    }
    return _post
  }
}