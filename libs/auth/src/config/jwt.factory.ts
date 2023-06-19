import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

export const jwtFactory: JwtModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>  ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN', '1d')
    }
  })
}