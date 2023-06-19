import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import {PostFacade} from "@lib/post/application-services";
import {CreatePostDto, UpdatePostDto} from "./dto";
import {CurrentUser, ICurrentUser, Public} from "@lib/auth";
import {JwtGuard} from "@lib/auth/guards/jwt.guard";
import {PaginationDto} from "@lib/shared/dto";
import {plainToInstance} from "class-transformer";
import {ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PostResponse} from "./responses";
import {ApiOkResponsePaginated} from "@lib/shared/response";

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  // All our business logic realized in post facade class, so we can use it in controller without service

  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({
    summary: 'Create post'
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postFacade.commands.createPost({...createPostDto, authorId: user.userId})
  }

  @ApiOperation({
    summary: 'Get post by id'
  })
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getPost(id)
  }

  @ApiOperation({
    summary: 'Get all posts with pagination'
  })
  @ApiOkResponsePaginated(PostResponse)
  @Public()
  @Get()
  async getPosts(@Query() paginationDto: PaginationDto) {
    const pagination = plainToInstance(PaginationDto, paginationDto)
    const result = await this.postFacade.queries.getAllPosts(pagination)
    return {
      ...pagination,
      ...result
    }
  }

  @ApiOperation({
    summary: 'Update post'
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Put(':id')
  updatePost(
    @CurrentUser() user: ICurrentUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postFacade.commands.updatePost({id, ...updatePostDto, authorId: user.userId})
  }

  @ApiOperation({
    summary: 'Set post to published'
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Patch(':id')
  setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id)
  }

  @ApiOperation({
    summary: 'Delete post'
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id)
  }
}
