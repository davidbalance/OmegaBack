import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import dayjs from "dayjs";
import { Between } from "typeorm";
import { TokenRepository } from "../repositories/token.repository";
import { AccessToken } from "../types/access-token.type";
import { RefreshToken } from "../types/refresh-token.type";
import { AuthConfig, AuthConfigName } from "@/shared/config/auth.config";

export type TokenPayload = { access: string, refresh: string, expiresAt: Date }

@Injectable()
export class TokenService {

  constructor(
    @Inject(TokenRepository) private readonly repository: TokenRepository,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService
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
    const auth = this.configService.get<AuthConfig>(AuthConfigName);
    const expiresAccess = dayjs().add(auth.jwt_expires, 'seconds').toDate();
    const expiresRefresh = dayjs().add(auth.jwt_refresh_expires, 'seconds').toDate();
    return { expiresAccess, expiresRefresh }
  }

  private async generateToken(sub: number): Promise<{ access: string, refresh: string }> {
    const auth = this.configService.get<AuthConfig>(AuthConfigName);

    const accessPayload: AccessToken = { sub: sub };
    const access = this.jwtService.sign(accessPayload);

    const refreshPayload: RefreshToken = { sub: sub, token: access };
    const refresh = this.jwtService.sign(refreshPayload, {
      secret: auth.jwt_referesh_secret,
      expiresIn: `${auth.jwt_refresh_expires}s`
    });
    return { access, refresh };
  }

  private async storeToken(key: number, token: string): Promise<void> {
    const auth = this.configService.get<AuthConfig>(AuthConfigName);

    const expiresAt = dayjs().add(auth.jwt_refresh_expires, 'seconds').toDate();
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

      await this.repository.findOneAndDelete({ key: token.sub });
      return false;
    } catch (error) {
      return false;
    }
  }
}
