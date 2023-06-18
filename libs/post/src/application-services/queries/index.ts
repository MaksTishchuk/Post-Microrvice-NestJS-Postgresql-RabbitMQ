import {Type} from "@nestjs/common";
import {IQueryHandler} from "@nestjs/cqrs";
import {GetPostQueryHandler} from "@lib/post/application-services/queries/get-post/get-post.query-handler";
import {GetAllPostsQueryHandler} from "@lib/post/application-services/queries/get-all-posts/get-all-posts.query-handler";

export const POST_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetPostQueryHandler,
  GetAllPostsQueryHandler
]
