import { Injectable, Provider } from "@nestjs/common";
import { CompanyFilterRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { CompanyFilterFindManyQueryToken } from "../inject/query.inject";
import { CompanyFilterFindManyQueryImpl } from "@omega/profile/application/query/user/company-filter-find-many.query";

@Injectable()
class CompanyFilterFindManyNestQuery extends CompanyFilterFindManyQueryImpl {
    constructor(
        @InjectModelRepository("CompanyFilter") repository: CompanyFilterRepository
    ) {
        super(repository);
    }
}

export const CompanyFilterFindManyQueryProvider: Provider = {
    provide: CompanyFilterFindManyQueryToken,
    useClass: CompanyFilterFindManyNestQuery
}