import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectResolver } from "../inject/resolver.inject";
import { CreateBranchFromExternalSourceService } from "@omega/location/application/service/create-branch-from-external-source.service";
import { CreateBranchFromExternalSourceServiceToken } from "../inject/service.inject";
import { BranchExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeExternalSourceResolver } from "@omega/location/application/resolver/corporative-external-source.resolver";
import { CompanyExternalSourceResolver } from "@omega/location/application/resolver/company-external-source.resolver";
import { BranchExternalSourceResolver } from "@omega/location/application/resolver/branch-external-source.resolver";

@Injectable()
export class CreateBranchFromExternalSourceNestService
    extends CreateBranchFromExternalSourceService {
    constructor(
        @InjectModelRepository("BranchExternalConnection") externalConnection: BranchExternalConnectionRepository,
        @InjectResolver("CorporativeExternalSource") typeResolver: CorporativeExternalSourceResolver,
        @InjectResolver("CompanyExternalSource") subtypeResolver: CompanyExternalSourceResolver,
        @InjectResolver("BranchExternalSource") examResolver: BranchExternalSourceResolver
    ) {
        super(
            externalConnection,
            typeResolver,
            subtypeResolver,
            examResolver
        );
    }
}

export const CreateBranchFromExternalSourceServiceProvider: Provider = {
    provide: CreateBranchFromExternalSourceServiceToken,
    useClass: CreateBranchFromExternalSourceNestService,
}