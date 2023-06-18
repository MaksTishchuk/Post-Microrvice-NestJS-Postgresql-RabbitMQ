import {Module, OnModuleInit} from '@nestjs/common';
import {CommandBus, CqrsModule, EventBus, QueryBus} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostEntity} from "@lib/entities";
import {POST_COMMANDS_HANDLERS} from "@lib/post/application-services/commands";
import {POST_EVENTS_HANDLERS} from "@lib/post/application-services/events";
import {POST_QUERIES_HANDLERS} from "@lib/post/application-services/queries";
import {PostFacade} from "@lib/post/application-services";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PostEntity])
  ],
  providers: [
    ...POST_COMMANDS_HANDLERS,
    ...POST_QUERIES_HANDLERS,
    ...POST_EVENTS_HANDLERS
  ],
  exports: [PostFacade]
})
export class PostModule implements OnModuleInit{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}
  onModuleInit(): any {
    this.commandBus.register(POST_COMMANDS_HANDLERS)
    this.queryBus.register(POST_QUERIES_HANDLERS)
    this.eventBus.register(POST_EVENTS_HANDLERS)
  }
}
