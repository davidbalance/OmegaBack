import { ClientConfig, ClientConfigName } from "@/shared/config/client.config";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";

export class SessionStrategy extends PassportStrategy(Strategy, 'session-auth') {

    constructor(
        @Inject(ConfigService) private readonly config: ConfigService
    ) {
        super(
            { header: 'x-client-key', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    async validate(apiKey: string, done: (error: Error, data) => void) {
        const client = this.config.get<ClientConfig>(ClientConfigName);
        try {
            if (apiKey === client.key) {
                done(null, {});
            }
        } catch (error) {
            done(new UnauthorizedException(), null);
        }
    }
}