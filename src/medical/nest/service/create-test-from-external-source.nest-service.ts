import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { CreateTestFromExternalSourceServiceToken } from "../inject/service.inject";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { PatientExternalSourceResolver } from "@omega/medical/application/resolver/patient-external-source.resolver";
import { OrderExternalSourceResolver } from "@omega/medical/application/resolver/order-external-source.resolver";
import { InjectResolver } from "../inject/resolver.inject";
import { TestExternalSourceResolver } from "@omega/medical/application/resolver/test-external-source.resolver";
import { CreateTestFromExternalSourceService } from "@omega/medical/application/service/create-test-from-external-source.service";
import { InjectNotificationDispatcher } from "../inject/notification-dispatcher.inject";
import { TestExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/test-external.notification-dispatcher";

@Injectable()
export class CreateTestFromExternalSourceNestService
    extends CreateTestFromExternalSourceService {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnection: TestExternalConnectionRepository,
        @InjectResolver("PatientExternalSource") patientResolver: PatientExternalSourceResolver,
        @InjectResolver("OrderExternalSource") orderResolver: OrderExternalSourceResolver,
        @InjectResolver("TestExternalSource") testResolver: TestExternalSourceResolver,
        @InjectNotificationDispatcher("TestExternal") notificationDispatcher: TestExternalNotificationDispatcher
    ) {
        super(
            externalConnection,
            patientResolver,
            orderResolver,
            testResolver,
            notificationDispatcher
        );
    }
}

export const CreateTestFromExternalSourceServiceProvider: Provider = {
    provide: CreateTestFromExternalSourceServiceToken,
    useClass: CreateTestFromExternalSourceNestService,
}