import { RefreshToken } from "@/shared";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        @Inject(ConfigService) private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.get<string>("jwt.refresh.secret")
        });
    }

    async validate(payload: RefreshToken): Promise<RefreshToken> {
        return payload;
    }
}