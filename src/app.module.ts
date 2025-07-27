// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule }   from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),   // ← rend ConfigService dispo partout
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
