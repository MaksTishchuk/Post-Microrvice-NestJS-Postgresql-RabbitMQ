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
    setPublished: (id: string) => this.setPublished(id),
    deletePost: (id: string) => this.deletePost(id)
  }
  queries = {
    getPost: (id: string) => this.getPost(id),
    getAllPosts: (pagination: PaginationDto) => this.getAllPosts(pagination)
  }
  events = {}

  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<
      CreatePostCommand,
      Awaited<ReturnType<CreatePostCommandHandler['execute']>>
    >(new CreatePostCommand(post))
  }

  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<
      UpdatePostCommand,
      Awaited<ReturnType<UpdatePostCommandHandler['execute']>>
    >(new UpdatePostCommand(post))
  }

  private setPublished(id: string) {
    return this.commandBus.execute<
      SetPublishedCommand,
      Awaited<ReturnType<SetPublishedCommandHandler['execute']>>
    >(new SetPublishedCommand(id))
  }

  private deletePost(id: string) {
    return this.commandBus.execute<
      DeletePostCommand,
      Awaited<ReturnType<DeletePostCommandHandler['execute']>>
    >(new DeletePostCommand(id))
  }

  private getPost(id: string) {
    return this.queryBus.execute<
      GetPostQuery,
      Awaited<ReturnType<GetPostQueryHandler['execute']>>
    >(new GetPostQuery(id))
  }

  private getAllPosts(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetAllPostsQuery,
      Awaited<ReturnType<GetAllPostsQueryHandler['execute']>>
    >(new GetAllPostsQuery(pagination))
  }
}
