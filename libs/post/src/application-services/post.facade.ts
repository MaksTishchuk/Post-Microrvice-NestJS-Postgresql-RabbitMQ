import {Injectable} from "@nestjs/common";
import {CommandBus, EventBus, QueryBus} from "@nestjs/cqrs";
import {CreatePostDto, UpdatePostDto} from "@lib/post/application-services/commands/dto";
import {CreatePostCommand} from "@lib/post/application-services/commands/create-post/create-post.command";
import {CreatePostCommandHandler} from "@lib/post/application-services/commands/create-post/create-post.command-handler";
import {UpdatePostCommand} from "@lib/post/application-services/commands/update-post/update-post.command";
import {UpdatePostCommandHandler} from "@lib/post/application-services/commands/update-post/update-post.command-handler";
import {SetPublishedCommand} from "@lib/post/application-services/commands/set-published-post/set-published.command";
import {SetPublishedCommandHandler} from "@lib/post/application-services/commands/set-published-post/set-published.command-handler";
import {DeletePostCommand} from "@lib/post/application-services/commands/delete-post/delete-post.command";
import {DeletePostCommandHandler} from "@lib/post/application-services/commands/delete-post/delete-post.command-handler";
import {GetPostQuery} from "@lib/post/application-services/queries/get-post/get-post.query";
import {PaginationDto} from "@lib/shared/dto";
import {GetAllPostsQuery} from "@lib/post/application-services/queries/get-all-posts/get-all-posts.query";
import {GetPostQueryHandler} from "@lib/post/application-services/queries/get-post/get-post.query-handler";
import {GetAllPostsQueryHandler} from "@lib/post/application-services/queries/get-all-posts/get-all-posts.query-handler";

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    setPublished: (id: number) => this.setPublished(id),
    deletePost: (id: number) => this.deletePost(id)
  }
  queries = {
    getPost: (id: number) => this.getPost(id),
    getAllPosts: (pagination: PaginationDto) => this.getAllPosts(pagination)
  }
  events = {}

  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<CreatePostCommand, CreatePostCommandHandler['execute']>(new CreatePostCommand(post))
  }

  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<UpdatePostCommand, UpdatePostCommandHandler['execute']>(new UpdatePostCommand(post))
  }

  private setPublished(id: number) {
    return this.commandBus.execute<SetPublishedCommand, SetPublishedCommandHandler['execute']>(new SetPublishedCommand(id))
  }

  private deletePost(id: number) {
    return this.commandBus.execute<DeletePostCommand, DeletePostCommandHandler['execute']>(new DeletePostCommand(id))
  }

  private getPost(id: number) {
    return this.queryBus.execute<GetPostQuery, GetPostQueryHandler['execute']>(new GetPostQuery(id))
  }

  private getAllPosts(pagination: PaginationDto) {
    return this.queryBus.execute<GetAllPostsQuery, GetAllPostsQueryHandler['execute']>(new GetAllPostsQuery(pagination))
  }
}
