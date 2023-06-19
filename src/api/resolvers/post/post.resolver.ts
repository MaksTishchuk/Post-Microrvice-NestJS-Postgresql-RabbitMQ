import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PaginatedPosts, PostResponse} from "./responses";
import {PostFacade} from "@lib/post/application-services";
import {PaginationDto} from "@lib/shared/dto";
import {plainToInstance} from "class-transformer";
import {CreatePostInput, UpdatePostInput} from "../inputs";

@Resolver(() => PostResponse)
export class PostResolver {

  constructor(
    private readonly postFacade: PostFacade
  ) {}

  @Query(() => PostResponse, {name: 'get_post'})
  async getPostById(
    @Args('id') id: string
  ) {
    return this.postFacade.queries.getPost(id)
  }

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
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postFacade.commands.createPost(createPostInput)
  }

  @Mutation(() => PostResponse, {name: 'update_post'})
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postFacade.commands.updatePost(updatePostInput)
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
