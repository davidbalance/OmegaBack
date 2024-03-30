import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AccessToken } from "../token/types";

export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
    constructor(
        @Inject(ConfigService) private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>("jwt.default.secret")
        });
    }

    async validate(payload: AccessToken): Promise<number> {
        return payload.sub;
    }
}