import {RabbitExchangeConfig} from "@amqp/rabbit-amqp-contracts/shared";

export const EXCHANGE_POST: RabbitExchangeConfig = {
  name: 'post',
  type: 'direct'
}