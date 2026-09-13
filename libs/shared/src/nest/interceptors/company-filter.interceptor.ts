import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { AuthPayload } from "@shared/shared/providers/auth.provider";
import { Request } from "express";
import { Observable } from "rxjs";

export const COMPANY_FILTER_INTERCEPTOR_TOKEN: string = 'COMPANY_FILTER_INTERCEPTOR_SERVICE'
export type CompanyInterceptorPayload = {
    companyRuc: string;
    corporativeName: string;
}
export interface CompanyFilterInterceptorService {
    findCompanyFilter(userId: string): Promise<CompanyInterceptorPayload[]>;
}

@Injectable()
export class CompanyFilterInterceptor implements NestInterceptor {
    constructor(
        @Inject(COMPANY_FILTER_INTERCEPTOR_TOKEN) private readonly service: CompanyFilterInterceptorService
    ) { }


    async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as AuthPayload;

        const value = await this.service.findCompanyFilter(user.id);
        request.user = value;
        return next.handle();
    }
}