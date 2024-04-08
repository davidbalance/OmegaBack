import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";
import { ApiKeyService } from "../api-key/api-key.service";

export class ApiKeyAuthStrategy extends PassportStrategy(Strategy, 'api-key-auth') {
    constructor(@Inject(ApiKeyService) private readonly service: ApiKeyService) {
        super({ header: 'x-api-key', prefix: '' }, true);
    }

    async validate(apiKey: string) {
        try {
            const user = await this.service.validate(apiKey);
            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}