import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { CreateOrderFromExternalSourceServiceToken } from "../inject/service.inject";
import { CreateOrderFromExternalSourceService } from "@omega/medical/application/service/create-order-from-external-source.service";
import { OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { PatientExternalSourceResolver } from "@omega/medical/application/resolver/patient-external-source.resolver";
import { OrderExternalSourceResolver } from "@omega/medical/application/resolver/order-external-source.resolver";
import { InjectResolver } from "../inject/resolver.inject";
import { InjectNotificationDispatcher } from "../inject/notification-dispatcher.inject";
import { OrderExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/order-external.notification-dispatcher";

@Injectable()
export class CreateOrderFromExternalSourceNestService
    extends CreateOrderFromExternalSourceService {
    constructor(
        @InjectModelRepository("OrderExternalConnection") externalConnection: OrderExternalConnectionRepository,
        @InjectResolver("PatientExternalSource") patientResolver: PatientExternalSourceResolver,
        @InjectResolver("OrderExternalSource") orderResolver: OrderExternalSourceResolver,
        @InjectNotificationDispatcher("OrderExternal") notificationDispatcher: OrderExternalNotificationDispatcher
    ) {
        super(
            externalConnection,
            patientResolver,
            orderResolver,
            notificationDispatcher
        );
    }
}

export const CreateOrderFromExternalSourceServiceProvider: Provider = {
    provide: CreateOrderFromExternalSourceServiceToken,
    useClass: CreateOrderFromExternalSourceNestService,
}