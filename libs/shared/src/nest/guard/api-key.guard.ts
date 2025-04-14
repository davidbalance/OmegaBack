import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectApiKey } from "../inject";
import { Request } from "express";
import { ApiKeyProvider } from "@shared/shared/providers/api-key.provider";
import { ApiHeader } from "@nestjs/swagger";

const omegaKey = 'x-omega-key';
export const OmegaApiKey = () => ApiHeader({ name: omegaKey, allowEmptyValue: false, required: true });

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        @InjectApiKey() private readonly service: ApiKeyProvider
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();

        const apiKey = request.headers[omegaKey];

        if (!apiKey) throw new UnauthorizedException('ApiKey authorization header is missing.');
        if (typeof apiKey !== 'string') throw new UnauthorizedException('Invalid apikey.');

        try {
            const user = await this.service.validateApiKey(apiKey);
            request.user = user;
            return true;
        } catch (error) {
            throw new InternalServerErrorException('ApiKey validation fails.');
        }
    }
}