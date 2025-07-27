import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';  // pour AuthGuard
import { ProfileController } from './profile.controller';

@Module({
  imports: [PassportModule],       // AuthGuard('jwt') a besoin de PassportModule
  controllers: [ProfileController],
})
export class ProfileModule {}
