import { ApiKeyValidatorService } from "@/authentication/api-key/services/api-key-validator.service";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";

export class ApiKeyAuthStrategy extends PassportStrategy(Strategy, 'api-key-auth') {
    constructor(@Inject(ApiKeyValidatorService) private readonly service: ApiKeyValidatorService) {
        super(
            { header: 'x-api-key', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    async validate(apiKey: string, done: (error: Error, data) => void) {
        try {
            const user = await this.service.validate(apiKey);
            done(null, user);
        } catch (error) {
            done(new UnauthorizedException(), null);
        }
    }
}