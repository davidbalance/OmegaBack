import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor() { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        const authorization = request.headers.authorization;

        if (!authorization) throw new UnauthorizedException('Authorization header is missing');

        const [auth, bearer] = authorization.split(' ');
        if (auth.toLowerCase() !== 'bearer' || !bearer) throw new UnauthorizedException("Invalid authorization format");

        request.user = bearer;
        return true;
    }
}