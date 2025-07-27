// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { verifyMessage } from 'ethers';

@Injectable()
export class AuthService {
  // 👇 On stocke en mémoire dans une Map
  private nonces = new Map<string, string>();

  async generateNonce(address: string): Promise<string> {
    const key = address.toLowerCase();
    const nonce = `Login nonce: ${randomBytes(16).toString('hex')}`;
    console.log(`[AuthService] store nonce for ${key}:`, nonce);
    this.nonces.set(key, nonce);
    return nonce;
  }

  async login(address: string, signature: string): Promise<{ access_token: string }> {
    const key = address.toLowerCase();
    const nonce = this.nonces.get(key);
    console.log(`[AuthService] retrieved nonce for ${key}:`, nonce);
    if (!nonce) {
      throw new UnauthorizedException('Nonce expirée ou inconnue');
    }
    this.nonces.delete(key);

    let recovered: string;
    try {
      recovered = verifyMessage(nonce, signature);
    } catch {
      throw new UnauthorizedException('Signature invalide');
    }
    if (recovered.toLowerCase() !== key) {
      throw new UnauthorizedException('Adresse signataire non reconnue');
    }

    const payload = { sub: address };
    return { access_token: this.jwtService.sign(payload) };
  }

  constructor(private readonly jwtService: JwtService) {}
}
