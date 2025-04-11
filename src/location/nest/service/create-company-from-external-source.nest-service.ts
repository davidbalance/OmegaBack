import { InjectResolver } from "../inject/resolver.inject";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { Injectable, Provider } from "@nestjs/common";
import { CreateCompanyFromExternalSourceService } from "@omega/location/application/service/create-company-from-external-source.service";
import { CompanyExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeExternalSourceResolver } from "@omega/location/application/resolver/corporative-external-source.resolver";
import { CompanyExternalSourceResolver } from "@omega/location/application/resolver/company-external-source.resolver";
import { CreateCompanyFromExternalSourceServiceToken } from "../inject/service.inject";

@Injectable()
export class CreateCompanyFromExternalSourceNestService
    extends CreateCompanyFromExternalSourceService {
    constructor(
        @InjectModelRepository("CompanyExternalConnection") externalConnection: CompanyExternalConnectionRepository,
        @InjectResolver("CorporativeExternalSource") typeResolver: CorporativeExternalSourceResolver,
        @InjectResolver("CompanyExternalSource") subtypeResolver: CompanyExternalSourceResolver,
    ) {
        super(
            externalConnection,
            typeResolver,
            subtypeResolver
        );
    }
}

export const CreateCompanyFromExternalSourceServiceProvider: Provider = {
    provide: CreateCompanyFromExternalSourceServiceToken,
    useClass: CreateCompanyFromExternalSourceNestService,
}