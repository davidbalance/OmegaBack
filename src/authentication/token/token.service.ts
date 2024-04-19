import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { Between } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RefreshToken, AccessToken } from './types';

type Tokens = {
  access: string;
  refresh: string;
}

export type TokenPayload = { token: string, expiresAt: Date }

@Injectable()
export class TokenService {

  constructor(
    @Inject(TokenRepository) private readonly repository: TokenRepository,
    @Inject(JwtService) private readonly jwt: JwtService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) { }

  async initToken(sub: number): Promise<{ access: TokenPayload, refresh: TokenPayload }> {
    const { access, refresh } = await this.generateToken(sub);
    const { expiresAccess, expiresRefresh } = this.getExpiresTime();
    await this.storeToken(sub, access);
    return {
      access: {
        token: access,
        expiresAt: expiresAccess
      },
      refresh: {
        token: refresh,
        expiresAt: expiresRefresh
      }
    };
  }

  async refreshToken(payload: RefreshToken): Promise<{ access: TokenPayload, refresh: TokenPayload }> {
    const flag = await this.canRefresh(payload);
    if (!flag) throw new ForbiddenException(["Forbidden token"]);
    const { access, refresh } = await this.generateToken(payload.sub);
    const { expiresAccess, expiresRefresh } = this.getExpiresTime();
    await this.storeToken(payload.sub, access);
    return {
      access: {
        token: access,
        expiresAt: expiresAccess
      },
      refresh: {
        token: refresh,
        expiresAt: expiresRefresh
      }
    };
  }

  private getExpiresTime = (): { expiresAccess: Date, expiresRefresh: Date } => {
    const expiresAccess = dayjs().add(this.config.get<number>("jwt.default.expiresIn"), 'seconds').toDate();
    const expiresRefresh = dayjs().add(this.config.get<number>("jwt.refresh.expiresIn"), 'seconds').toDate();
    return { expiresAccess, expiresRefresh }
  }

  async generateToken(sub: number): Promise<Tokens> {
    const accessPayload: AccessToken = { sub: sub };
    const access = this.jwt.sign(accessPayload);

    const secret: string = this.config.get<string>('jwt.refresh.secret');
    const expiresIn: number = this.config.get<number>('jwt.refresh.expiresIn');
    const refreshPayload: RefreshToken = { sub: sub, token: access };
    const refresh = this.jwt.sign(refreshPayload, { secret: secret, expiresIn: `${expiresIn}s` });
    return { access, refresh };
  }

  async storeToken(key: number, token: string): Promise<void> {
    const expiresIn: number = this.config.get<number>('jwt.refresh.expiresIn');
    const expiresAt = dayjs().add(expiresIn, 'seconds').toDate();
    try {
      await this.repository.findOneAndUpdate({ key: key }, { token: token, expiresAt: expiresAt });
    } catch (error) {
      await this.repository.create({ key: key, token: token, expiresAt: expiresAt });
    }
  }

  validateToken(token: string): AccessToken {
    return this.jwt.decode<AccessToken>(token);
  }

  async removeToken(sub: number): Promise<void> {
    this.repository.findOneAndDelete({ key: sub });
  }

  async removeExpireToken(): Promise<void> {
    const to = dayjs().toDate();
    const from = dayjs().subtract(1, "day").toDate();
    await this.repository.findOneAndDelete({ expiresAt: Between(from, to) });
  }

  private async canRefresh(token: RefreshToken): Promise<boolean> {
    try {
      const storedToken = await this.repository.findOne({ where: { key: token.sub } });
      const match = storedToken.token === token.token;
      
      if (match) return true;
      
      const secondsNeededToAllowRefresh = 60;
      const issuedAt = dayjs.unix(token.iat);
      const diff = dayjs().diff(issuedAt, 'seconds');

      if (diff > secondsNeededToAllowRefresh) return true;

      await this.repository.findOneAndDelete({ key: token.sub });
      return false;
    } catch (error) {
      return false;
    }
  }
}
