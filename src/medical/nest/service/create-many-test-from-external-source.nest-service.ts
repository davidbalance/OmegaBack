import { Injectable, Provider } from "@nestjs/common";
import { CreateManyTestFromExternalSourceService } from "@omega/medical/application/service/create-many-test-from-external-source.service";
import { CreateManyTestFromExternalSourceServiceToken, InjectService } from "../inject/service.inject";
import { CreateTestFromExternalSourceService } from "@omega/medical/application/service/create-test-from-external-source.service";
import { CreateOrderFromExternalSourceService } from "@omega/medical/application/service/create-order-from-external-source.service";

@Injectable()
export class CreateManyTestFromExternalSourceNestService
    extends CreateManyTestFromExternalSourceService {
    constructor(
        @InjectService("CreateOrderFromExternalSource") createOrder: CreateOrderFromExternalSourceService,
        @InjectService("CreateTestFromExternalSource") createTest: CreateTestFromExternalSourceService
    ) {
        super(createOrder, createTest);
    }
}

export const CreateManyTestFromExternalSourceServiceProvider: Provider = {
    provide: CreateManyTestFromExternalSourceServiceToken,
    useClass: CreateManyTestFromExternalSourceNestService,
}