import { Injectable, Provider } from "@nestjs/common";
import { CompanyFindManyQueryImpl } from "@omega/location/application/query/corporative/company-find-many.query";
import { CompanyRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CompanyFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class CompanyFindManyNestQuery extends CompanyFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Company") repository: CompanyRepository
    ) {
        super(repository);
    }
}

export const CompanyFindManyQueryProvider: Provider = {
    provide: CompanyFindManyQueryToken,
    useClass: CompanyFindManyNestQuery
}