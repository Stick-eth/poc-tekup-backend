import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Request() req) {
    // req.user.address vient de JwtStrategy.validate()
    return {
      address: req.user.address,
      message: 'Bienvenue sur ta page profil !',
    };
  }
}
