import {Body, Controller, Post} from '@nestjs/common';
import {PostFacade} from "@lib/post/application-services";
import {CreatePostDto} from "./dto";
import {CurrentUser, ICurrentUser} from "@lib/auth";
import * as uuid from 'uuid'

@Controller('posts')
export class PostController {
  // All our business logic realized in post facade class, so we can use it in controller without service

  constructor(private readonly postFacade: PostFacade) {}

  // @Post()
  // createPost(
  //   @CurrentUser() user: ICurrentUser,
  //   @Body() createPostDto: CreatePostDto
  // ) {
  //   return this.postFacade.commands.createPost({...createPostDto, authorId: user.userId})
  // }

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postFacade.commands.createPost({...createPostDto, authorId: uuid.v4()})
  }
}
