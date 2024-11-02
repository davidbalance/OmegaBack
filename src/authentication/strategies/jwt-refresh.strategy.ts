import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RefreshToken } from "../token/types/refresh-token.type";
import { AuthConfig, AuthConfigName } from "@/shared/config/auth.config";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        @Inject(ConfigService) config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.get<AuthConfig>(AuthConfigName).jwt_referesh_secret
        });
    }

    async validate(payload: RefreshToken): Promise<RefreshToken> {
        return payload;
    }
}