// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PassportModule } from '@nestjs/passport';
import { JwtModule }     from '@nestjs/jwt';

import { AuthService }    from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy }    from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,  // nécessaire pour injecter ConfigService ici

    // Cache manager global
    CacheModule.register({
      ttl: parseInt(process.env.NONCE_TTL || '300', 10),
      isGlobal: true,
    }),

    PassportModule,

    // JwtModule asynchrone
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
