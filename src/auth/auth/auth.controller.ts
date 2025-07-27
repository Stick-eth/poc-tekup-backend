import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service'


class NonceDto {
  address: string;
}

class LoginDto {
  address: string;
  signature: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** 1. Génère une nonce pour l’adresse donnée */
  @Post('nonce')
  async getNonce(@Body() { address }: NonceDto) {
    return { nonce: await this.authService.generateNonce(address) };
  }

  /** 2. Vérifie la signature et renvoie un JWT */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.address, dto.signature);
  }
}
