import { Module } from '@nestjs/common';
import {ProvidersModule} from "@lib/providers";
import {SharedModule} from "@lib/shared";

@Module({
  imports: [
    SharedModule, // глобальный обработчик ошибок для всего приложения
    ProvidersModule
  ]
})
export class AppModule {}
