import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtFactory} from "@lib/auth/config";
import {GUARDS} from "@lib/auth/guards";
import {STRATEGIES} from "@lib/auth/strategies";
import {AuthService} from "@lib/auth/auth.service";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync(jwtFactory)
  ],
  providers: [
    AuthService,
    ...GUARDS,
    ...STRATEGIES
  ],
  exports: [AuthService],
})
export class AuthModule {}
