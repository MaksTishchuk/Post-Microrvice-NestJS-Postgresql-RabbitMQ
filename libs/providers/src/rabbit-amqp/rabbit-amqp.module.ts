import {Global, Module} from '@nestjs/common';
import {
  AmqpConnectionManager,
  RabbitMQModule,
  RabbitRpcParamsFactory
} from "@golevelup/nestjs-rabbitmq";
import {ConfigService} from "@nestjs/config";
import {rabbitAmqpConfig} from "@lib/providers/rabbit-amqp/rabbit-amqp.config";

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => rabbitAmqpConfig(configService)
    })
  ],
  providers: [RabbitRpcParamsFactory, AmqpConnectionManager],
  exports: [RabbitMQModule]
})

export class RabbitAmqpModule {}
