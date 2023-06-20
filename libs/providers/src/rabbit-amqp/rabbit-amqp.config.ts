import {ConfigService} from "@nestjs/config";
import {RabbitMQConfig, RabbitMQExchangeConfig} from "@golevelup/nestjs-rabbitmq";

const AMQP_EXCHANGES: RabbitMQExchangeConfig[] = []

export const rabbitAmqpConfig = (configService: ConfigService): RabbitMQConfig => {
  const uri = configService.get('AMQP_URI')
  if (!uri) {
    throw new Error(`"AMQP_URI" not found! Check .env`)
  }
  return {
    exchanges: AMQP_EXCHANGES,
    uri,
    connectionInitOptions: {wait: false},
    connectionManagerOptions: {
      heartbeatIntervalInSeconds: 15,
      reconnectTimeInSeconds: 30
    }
  }
}