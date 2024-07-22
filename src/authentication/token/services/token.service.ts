import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import dayjs from "dayjs";
import { Between } from "typeorm";
import { TokenRepository } from "../repositories/token.repository";
import { AccessToken } from "../types/access-token.type";
import { RefreshToken } from "../types/refresh-token.type";

export type TokenPayload = { access: string, refresh: string, expiresAt: Date }

@Injectable()
export class TokenService {

  constructor(
    @Inject(TokenRepository) private readonly repository: TokenRepository,
    @Inject(JwtService) private readonly jwt: JwtService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) { }

  async initToken(sub: number): Promise<TokenPayload> {
    const { access, refresh } = await this.generateToken(sub);
    const { expiresRefresh } = this.getExpiresTime();
    await this.storeToken(sub, access);
    return {
      access: access,
      refresh: refresh,
      expiresAt: expiresRefresh
    };
  }

  async refreshToken(payload: RefreshToken): Promise<TokenPayload> {
    const flag = await this.canRefresh(payload);
    if (!flag) throw new ForbiddenException(["Forbidden token"]);
    const { access, refresh } = await this.generateToken(payload.sub);
    const { expiresRefresh } = this.getExpiresTime();
    await this.storeToken(payload.sub, access);
    return {
      access: access,
      refresh: refresh,
      expiresAt: expiresRefresh
    };
  }

  private getExpiresTime = (): { expiresAccess: Date, expiresRefresh: Date } => {
    const expiresAccess = dayjs().add(this.config.get<number>("JWT_DEFAULT_EXPIRES_IN"), 'seconds').toDate();
    const expiresRefresh = dayjs().add(this.config.get<number>("JWT_REFRESH_EXPIRES_IN"), 'seconds').toDate();
    return { expiresAccess, expiresRefresh }
  }

  private async generateToken(sub: number): Promise<{ access: string, refresh: string }> {
    const accessPayload: AccessToken = { sub: sub };
    const access = this.jwt.sign(accessPayload);

    const secret: string = this.config.get<string>('JWT_REFRESH_SECRET');
    const expiresIn: number = this.config.get<number>('JWT_REFRESH_EXPIRES_IN');
    const refreshPayload: RefreshToken = { sub: sub, token: access };
    const refresh = this.jwt.sign(refreshPayload, { secret: secret, expiresIn: `${expiresIn}s` });
    return { access, refresh };
  }

  private async storeToken(key: number, token: string): Promise<void> {
    const expiresIn: number = this.config.get<number>('JWT_REFRESH_EXPIRES_IN');
    const expiresAt = dayjs().add(expiresIn, 'seconds').toDate();
    try {
      await this.repository.findOneAndUpdate({ key: key }, { token: token, expiresAt: expiresAt });
    } catch (error) {
      await this.repository.create({ key: key, token: token, expiresAt: expiresAt });
    }
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

      const secondsNeededToAllowRefresh = 0;
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
