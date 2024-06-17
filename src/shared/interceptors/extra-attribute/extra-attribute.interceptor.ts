import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { ExtraAttributeInterceptorService } from "./extra-attribute-interceptor.service";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ExtraAttribute } from "@/shared/decorator";

@Injectable()
export class ExtraAttributeInterceptor implements NestInterceptor {
    constructor(
        private reflector: Reflector,
        @Inject(ExtraAttributeInterceptorService) private readonly service: ExtraAttributeInterceptorService
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<Request>();
        const attributeKey: string = this.reflector.get(ExtraAttribute, context.getHandler());
        const sub = request.user as number;
        const attribute = await this.service.getExtraAttribute(sub, attributeKey);
        request.user = attribute;
        return next.handle();
    }
}