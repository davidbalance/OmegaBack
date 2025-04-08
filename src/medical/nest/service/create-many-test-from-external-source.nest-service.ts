import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { CreateManyTestFromExternalSourceService } from "@omega/medical/application/service/create-many-test-from-external-source.service";
import { CreateManyTestFromExternalSourceServiceToken, InjectService } from "../inject/service.inject";
import { CreateTestFromExternalSourceService } from "@omega/medical/application/service/create-test-from-external-source.service";

@Injectable()
export class CreateManyTestFromExternalSourceNestService
    extends CreateManyTestFromExternalSourceService {
    constructor(
        @InjectModelRepository("OrderExternalConnection") externalConnection: OrderExternalConnectionRepository,
        @InjectService("CreateTestFromExternalSource") createTest: CreateTestFromExternalSourceService
    ) {
        super(externalConnection, createTest);
    }
}

export const CreateManyTestFromExternalSourceServiceProvider: Provider = {
    provide: CreateManyTestFromExternalSourceServiceToken,
    useClass: CreateManyTestFromExternalSourceNestService,
}