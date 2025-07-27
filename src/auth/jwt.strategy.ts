import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string; // l'adresse Ethereum
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:      cfg.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    // payload.sub contient l'adresse signataire
    return { address: payload.sub };
  }
}
