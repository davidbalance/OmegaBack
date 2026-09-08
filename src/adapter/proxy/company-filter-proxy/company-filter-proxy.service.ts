import { Injectable, Provider } from "@nestjs/common";
import { CompanyFilterFindManyQuery } from "@omega/profile/application/query/user/company-filter-find-many.query";
import { InjectQuery } from "@omega/profile/nest/inject/query.inject";
import { COMPANY_FILTER_INTERCEPTOR_TOKEN, CompanyFilterInterceptorService, CompanyInterceptorPayload } from "@shared/shared/nest/interceptors/company-filter.interceptor";

@Injectable()
export class CompanyFilterProxyService implements CompanyFilterInterceptorService {

    constructor(
        @InjectQuery('CompanyFilterFindMany') private readonly findMany: CompanyFilterFindManyQuery
    ) { }

    async findCompanyFilter(userId: string): Promise<CompanyInterceptorPayload[]> {
        const values = await this.findMany.handleAsync({ userId });
        return values.data.map(e => ({ companyRuc: e.companyRuc, corporativeName: e.corporativeName }));
    }
}

export const CompanyFilterProxyProvider: Provider = {
    provide: COMPANY_FILTER_INTERCEPTOR_TOKEN,
    useClass: CompanyFilterProxyService
}