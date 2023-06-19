import {IPost} from "@lib/post";
import {ApiProperty} from "@nestjs/swagger";
import * as uuid from 'uuid'

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({
    description: 'Post id',
    type: 'string',
    example: uuid.v4()
  })
  id: string

  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'post 1'
  })
  title: string

  @ApiProperty({
    description: 'Post message',
    type: 'string',
    example: 'message 1'
  })
  message: string

  @ApiProperty({
    description: 'Post author',
    type: 'string',
    example: uuid.v4()
  })
  authorId: string

  @ApiProperty({
    description: 'Post created at',
    type: 'string',
    example: new Date().toISOString()
  })
  createdAt: string

  @ApiProperty({
    description: 'Post updated at',
    type: 'string',
    example: new Date().toISOString()
  })
  updatedAt: string
}