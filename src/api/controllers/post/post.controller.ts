import { Controller } from '@nestjs/common';
import {PostFacade} from "@lib/post/application-services";

@Controller('post')
export class PostController {
  // All our business logic realized in post facade class, so we can use it in controller without service

  constructor(private readonly postFacade: PostFacade) {}

}
