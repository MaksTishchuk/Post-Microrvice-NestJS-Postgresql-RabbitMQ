import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {PostFacade} from "@lib/post/application-services";
import {CreatePostDto} from "./dto";
import {CurrentUser, ICurrentUser} from "@lib/auth";
import * as uuid from 'uuid'
import {JwtGuard} from "@lib/auth/guards/jwt.guard";

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  // All our business logic realized in post facade class, so we can use it in controller without service

  constructor(private readonly postFacade: PostFacade) {}

  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postFacade.commands.createPost({...createPostDto, authorId: user.userId})
  }
}
