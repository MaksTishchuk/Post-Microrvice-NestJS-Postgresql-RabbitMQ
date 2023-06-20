import {
  QueueDeclaration,
  RabbitAmqpBaseRequest,
  RabbitAmqpBaseResponse
} from "@amqp/rabbit-amqp-contracts/shared";
import {EXCHANGE_POST} from "@amqp/rabbit-amqp-contracts/exchanges";
import {CreatePostRequest, PostResponse} from "@amqp/rabbit-amqp-contracts/queues/post/interfaces";

export namespace CreatePostContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `${EXCHANGE_POST.name}-create`,
    routingKey: `${EXCHANGE_POST.name}-create`,
    queueOptions: {
      durable: true   // after restart messages in queues will not be lost
    }
  }

  export type request = RabbitAmqpBaseRequest<CreatePostRequest>

  export type response = RabbitAmqpBaseResponse<PostResponse>
}

