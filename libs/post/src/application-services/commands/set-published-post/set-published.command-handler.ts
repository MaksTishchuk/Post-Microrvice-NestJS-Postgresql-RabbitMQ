import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {PostAggregate} from "@lib/post";
import {PostRepository} from "@lib/post/providers";
import {BadRequestException, Logger} from "@nestjs/common";
import {SetPublishedCommand} from "@lib/post/application-services/commands/set-published-post/set-published.command";

@CommandHandler(SetPublishedCommand)
export class SetPublishedCommandHandler implements ICommandHandler<SetPublishedCommand, PostAggregate> {
  private readonly logger = new Logger(SetPublishedCommandHandler.name)

  constructor(
    private readonly postRepository: PostRepository
  ) {}

  async execute({ id }: SetPublishedCommand): Promise<PostAggregate> {
    const existsPost = await this.postRepository
      .findOne(id)
      .catch(err => {
        this.logger.error(err)
        return null as PostAggregate
      })
    if (!existsPost) {
      throw new BadRequestException(`Post by id ${id} was not found!`)
    }
    const postAggregate = PostAggregate.create(existsPost)
    await postAggregate.setPublished()
    await this.postRepository.save(postAggregate)
    return postAggregate
  }

}