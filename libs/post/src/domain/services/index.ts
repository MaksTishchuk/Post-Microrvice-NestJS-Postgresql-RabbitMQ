import {AggregateRoot} from "@nestjs/cqrs";
import {ISetNotPublished, SET_NOT_PUBLISHED} from "@lib/post/domain/services/set-not-is-published";
import {ISetPublished, SET_PUBLISHED} from "@lib/post/domain/services/set-is-published";

export class PostServices extends AggregateRoot implements ISetNotPublished, ISetPublished {
  setNotPublished = SET_NOT_PUBLISHED
  setPublished = SET_PUBLISHED
}