import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { AuthPayload } from "@shared/shared/providers/auth.provider";
import { Request } from "express";
import { Observable } from "rxjs";

export class DniInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as AuthPayload;
        request.user = user.dni;
        return next.handle();
    }
}