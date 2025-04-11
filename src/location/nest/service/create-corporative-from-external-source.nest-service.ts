import { Injectable, Provider } from "@nestjs/common";
import { InjectResolver } from "../inject/resolver.inject";
import { CreateCorporativeFromExternalSourceService } from "@omega/location/application/service/create-corporative-from-external-source.service";
import { CorporativeExternalSourceResolver } from "@omega/location/application/resolver/corporative-external-source.resolver";
import { CreateCorporativeFromExternalSourceServiceToken } from "../inject/service.inject";

@Injectable()
export class CreateCorporativeFromExternalSourceNestService
    extends CreateCorporativeFromExternalSourceService {
    constructor(
        @InjectResolver("CorporativeExternalSource") typeResolver: CorporativeExternalSourceResolver,
    ) {
        super(typeResolver);
    }
}

export const CreateCorporativeFromExternalSourceServiceProvider: Provider = {
    provide: CreateCorporativeFromExternalSourceServiceToken,
    useClass: CreateCorporativeFromExternalSourceNestService,
}