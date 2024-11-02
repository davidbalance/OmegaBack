import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { DataInterceptorService } from "./data-interceptor.service";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class EmailInterceptor implements NestInterceptor {

    constructor(
        @Inject(DataInterceptorService) private readonly service: DataInterceptorService
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();
        const sub = request.user as number;
        const user = await this.service.getEmail(sub);
        request.user = user;
        return next.handle();
    }
}
