import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PostFacade} from "@lib/post/application-services";
import {PaginationDto} from "@lib/shared/dto";
import {plainToInstance} from "class-transformer";
import {CreatePostInput, UpdatePostInput} from "../inputs";
import {PaginatedPosts, PostResponse} from "../responses";
import {GraphqlCurrentUser, ICurrentUser, Public} from "@lib/auth";
import {UseGuards} from "@nestjs/common";
import {GraphqlAuthGuard} from "@lib/auth/guards/graphql-auth.guard";

@UseGuards(GraphqlAuthGuard)
@Resolver(() => PostResponse)
export class PostResolver {

  constructor(
    private readonly postFacade: PostFacade
  ) {}

  @Public()
  @Query(() => PostResponse, {name: 'get_post'})
  async getPostById(
    @Args('id') id: string
  ) {
    return this.postFacade.queries.getPost(id)
  }

  @Public()
  @Query(() => PaginatedPosts, {name: 'get_posts'})
  async getPosts(
    @Args() paginationDto: PaginationDto
  ) {
    const pagination = plainToInstance(PaginationDto, paginationDto)
    const result = await this.postFacade.queries.getAllPosts(pagination)
    return {
      ...pagination,
      ...result
    }
  }

  @Mutation(() => PostResponse, {name: 'create_post'})
  async createPost(
    @GraphqlCurrentUser() currentUser: ICurrentUser,
    @Args('createPostInput') createPostInput: CreatePostInput
  ) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: currentUser.userId
    })
  }

  @Mutation(() => PostResponse, {name: 'update_post'})
  async updatePost(
    @GraphqlCurrentUser() currentUser: ICurrentUser,
    @Args('updatePostInput') updatePostInput: UpdatePostInput
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePostInput,
      authorId: currentUser.userId
    })
  }

  @Mutation(() => PostResponse, {name: 'set_published_post'})
  async setPublishedPost(@Args('id') id: string) {
    return this.postFacade.commands.setPublished(id)
  }

  @Mutation(() => Boolean, {name: 'delete_post'})
  async deletePost(@Args('id') id: string) {
    return this.postFacade.commands.deletePost(id)
  }
}
