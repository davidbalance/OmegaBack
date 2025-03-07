import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthPayload } from "@shared/shared/providers/auth.provider";
import { Request } from "express";
import { Observable } from "rxjs";
import { Attribute } from "../decorators/attribute.decorator";

export const ATTRIBUTE_INTERCEPTOR_TOKEN: string = 'ATTRIBUTE_INTERCEPTOR_SERVICE'
export interface AttributeInterceptorService {
    findAttribute(userId: string, name: string): Promise<string>;
}

@Injectable()
export class AttributeInterceptor implements NestInterceptor {
    constructor(
        @Inject(Reflector) private readonly reflector: Reflector,
        @Inject(ATTRIBUTE_INTERCEPTOR_TOKEN) private readonly service: AttributeInterceptorService
    ) { }


    async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as AuthPayload;

        const attribute: string = this.reflector.get(Attribute, context.getHandler());
        const value = await this.service.findAttribute(user.id, attribute);
        request.user = value;
        return next.handle();
    }
}