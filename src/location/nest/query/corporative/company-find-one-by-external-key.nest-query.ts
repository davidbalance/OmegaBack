import { Injectable, Provider } from "@nestjs/common";
import { CompanyExternalConnectionRepository, CompanyRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CompanyFindOneByExternalKeyQueryToken } from "../../inject/query.inject";
import { CompanyFindOneByExternalKeyQueryImpl } from "@omega/location/application/query/corporative/company.find-one-by-external-key.query";

@Injectable()
class CompanyFindOneByExternalKeyNestQuery extends CompanyFindOneByExternalKeyQueryImpl {
    constructor(
        @InjectModelRepository("CompanyExternalConnection") externalConnectionRepository: CompanyExternalConnectionRepository,
        @InjectModelRepository("Company") modelRepository: CompanyRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const CompanyFindOneByExternalKeyQueryProvider: Provider = {
    provide: CompanyFindOneByExternalKeyQueryToken,
    useClass: CompanyFindOneByExternalKeyNestQuery
}