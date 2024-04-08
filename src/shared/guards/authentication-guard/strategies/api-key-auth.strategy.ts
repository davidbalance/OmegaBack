import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";
import { ApiKeyService } from "../../../../authentication/api-key/api-key.service";

export class ApiKeyAuthStrategy extends PassportStrategy(Strategy, 'api-key-auth') {
    constructor(@Inject(ApiKeyService) private readonly service: ApiKeyService) {
        super(
            { header: 'x-api-key', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    async validate(apiKey: string, done: (error: Error, data) => {}) {
        try {
            const user = await this.service.validate(apiKey);
            done(null, user);
        } catch (error) {
            done(new UnauthorizedException(), null);
        }
    }
}