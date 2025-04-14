import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectAuth } from "../inject";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectAuth() private readonly service: AuthProvider
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();

        const authorization = request.headers.authorization;

        if (!authorization) throw new UnauthorizedException('Authorization header is missing');

        const [auth, bearer] = authorization.split(' ');
        if (auth.toLowerCase() !== 'bearer' || !bearer) throw new UnauthorizedException("Invalid authorization format");

        try {
            const user = await this.service.validateJwt(bearer);
            request.user = user;
            return true;
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new NotFoundException("Profile not found");
            }
            throw error;
        }
    }
}