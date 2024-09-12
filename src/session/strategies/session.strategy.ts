import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";

export class SessionStrategy extends PassportStrategy(Strategy, 'session-auth') {

    constructor(
        @Inject(ConfigService) private readonly service: ConfigService
    ) {
        super(
            { header: 'x-client-key', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    async validate(apiKey: string, done: (error: Error, data) => void) {
        try {
            if (apiKey === this.service.get('CLIENT_KEY')) {
                done(null, {});
            }
        } catch (error) {
            done(new UnauthorizedException(), null);
        }
    }
}