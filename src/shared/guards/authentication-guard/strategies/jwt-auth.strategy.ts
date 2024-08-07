import { AccessToken } from "@/authentication/token/types/access-token.type";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
    constructor(
        @Inject(ConfigService) private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>("JWT_DEFAULT_SECRET")
        });
    }

    async validate(payload: AccessToken): Promise<number> {
        return payload.sub;
    }
}