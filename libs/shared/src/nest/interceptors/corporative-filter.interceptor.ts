import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { AuthPayload } from "@shared/shared/providers/auth.provider";
import { Request } from "express";
import { Observable } from "rxjs";

export const CORPORATIVE_FILTER_INTERCEPTOR_TOKEN: string = 'CORPORATIVE_FILTER_INTERCEPTOR_SERVICE'
export type CorporativeInterceptorPayload = {
    corporativeName: string;
}
export interface CorporativeFilterInterceptorService {
    findCorporativeFilter(userId: string): Promise<CorporativeInterceptorPayload[]>;
}

@Injectable()
export class CorporativeFilterInterceptor implements NestInterceptor {
    constructor(
        @Inject(CORPORATIVE_FILTER_INTERCEPTOR_TOKEN) private readonly service: CorporativeFilterInterceptorService
    ) { }


    async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as AuthPayload;

        const value = await this.service.findCorporativeFilter(user.id);
        request.user = value;
        return next.handle();
    }
}