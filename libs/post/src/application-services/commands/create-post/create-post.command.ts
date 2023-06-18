import {CreatePostDto} from "@lib/post/application-services/commands/create-post/dto";

export class CreatePostCommand {
  constructor(
    public readonly post: CreatePostDto
  ) {
  }
}