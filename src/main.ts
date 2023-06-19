import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Posts Microservice')
    .setDescription('Posts CRUD API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('documentation', app, document)

  const PORT = configService.get<number>('PORT', 3000)
  await app.listen(PORT, () => {
    Logger.log(`Application has been started on PORT: ${PORT}`, 'Main')
    Logger.log(`Swagger documentation on: /documentation`, 'Main')
  })
}
bootstrap();
