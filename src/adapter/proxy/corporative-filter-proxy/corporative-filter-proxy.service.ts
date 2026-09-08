import { Injectable, Provider } from "@nestjs/common";
import { CorporativeFilterFindManyQuery } from "@omega/profile/application/query/user/corporative-filter-find-many.query";
import { InjectQuery } from "@omega/profile/nest/inject/query.inject";
import { CORPORATIVE_FILTER_INTERCEPTOR_TOKEN, CorporativeFilterInterceptorService, CorporativeInterceptorPayload } from "@shared/shared/nest/interceptors/corporative-filter.interceptor";

@Injectable()
export class CorporativeFilterProxyService implements CorporativeFilterInterceptorService {

    constructor(
        @InjectQuery('CorporativeFilterFindMany') private readonly findMany: CorporativeFilterFindManyQuery
    ) { }

    async findCorporativeFilter(userId: string): Promise<CorporativeInterceptorPayload[]> {
        const values = await this.findMany.handleAsync({ userId });
        return values.data.map(e => ({ corporativeName: e.corporativeName }));
    }
}

export const CorporativeFilterProxyProvider: Provider = {
    provide: CORPORATIVE_FILTER_INTERCEPTOR_TOKEN,
    useClass: CorporativeFilterProxyService
}