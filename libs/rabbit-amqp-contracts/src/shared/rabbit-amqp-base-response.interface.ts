import {RabbitAmqpBaseRequest} from "@amqp/rabbit-amqp-contracts/shared/rabbit-amqp-base-request.interface";

export interface RabbitAmqpBaseResponse<T = unknown> extends RabbitAmqpBaseRequest<T> {
  error?: {
    code: string
    message: string
  }
}