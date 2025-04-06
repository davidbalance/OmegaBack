import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { Filter } from "@shared/shared/domain";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { OrderExternalSourceResolver, OrderExternalSourceResolverPayload } from "../resolver/order-external-source.resolver";
import { TestExternalSourceResolver, TestExternalSourceResolverPayload } from "../resolver/test-external-source.resolver";
import { PatientExternalSourceResolver, PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";
import { TestExternalConnectionRepository } from "../repository/model.repositories";
import { TestExternalNotificationDispatcher } from "../notification-dispatcher/test-external.notification-dispatcher";

export type CreateTestFromExternalSourcePayload = CreateFromExternalSourcePayload & PatientExternalSourceResolverPayload & OrderExternalSourceResolverPayload & Omit<TestExternalSourceResolverPayload, 'orderId'>;
export class CreateTestFromExternalSourceService
    implements CreateFromExternalSource<CreateTestFromExternalSourcePayload, TestExternalConnectionModel> {
    constructor(
        private readonly externalConnection: TestExternalConnectionRepository,
        private readonly patientResolver: PatientExternalSourceResolver,
        private readonly orderResolver: OrderExternalSourceResolver,
        private readonly testResolver: TestExternalSourceResolver,
        private readonly notificationDispatcher: TestExternalNotificationDispatcher
    ) { }

    async createAsync(value: CreateTestFromExternalSourcePayload): Promise<TestExternalConnectionModel> {
        const filter: Filter<TestExternalConnectionModel>[] = [
            { field: 'testExternalKey', operator: 'eq', value: value.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: value.owner },
        ]

        let externalTest = await this.externalConnection.findOneAsync(filter);
        if (externalTest) {
            return externalTest;
        }

        const externalPatient = await this.patientResolver.resolve({ ...value });
        const externalOrder = await this.orderResolver.resolve({ ...value, patientDni: externalPatient.patientDni });
        externalTest = await this.testResolver.resolve({ ...value, orderId: externalOrder.orderId });
        await this.notificationDispatcher.emitAsync({ ...value, orderId: externalOrder.orderId });
        return externalTest;
    }
}