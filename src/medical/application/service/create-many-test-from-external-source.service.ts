import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { OrderExternalSourceResolverPayload } from "../resolver/order-external-source.resolver";
import { TestExternalSourceResolverPayload } from "../resolver/test-external-source.resolver";
import { PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";
import { CreateTestFromExternalSourceService } from "./create-test-from-external-source.service";
import { OrderExternalConnectionRepository } from "../repository/model.repositories";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

export type TestOrderExternal = {
    patientDni: string;
    orderId: string;
    orderExternalKey: string;
    orderExternalOwner: string;
    tests: {
        testId: string;
        testExternalKey: string;
        testExternalOwner: string;
    }[];
}
export type CreateManyTestFromExternalSourcePayload = CreateFromExternalSourcePayload & PatientExternalSourceResolverPayload & OrderExternalSourceResolverPayload & {
    tests: Omit<TestExternalSourceResolverPayload, 'orderId' | 'owner'>[]
};
export class CreateManyTestFromExternalSourceService
    implements CreateFromExternalSource<CreateManyTestFromExternalSourcePayload, TestOrderExternal> {
    constructor(
        private readonly externalConnection: OrderExternalConnectionRepository,
        private readonly createTest: CreateTestFromExternalSourceService
    ) { }

    async createAsync({ tests, ...value }: CreateManyTestFromExternalSourcePayload): Promise<TestOrderExternal> {
        const take: number = 5;
        const externalTests: TestExternalConnectionModel[] = [];

        for (let i = 0; i < tests.length; i += take) {
            const promises = tests
                .slice(i, i + take)
                .map(async (e) => await this.createTest.createAsync({ ...value, ...e }));

            const newTests = await Promise.all(promises);
            externalTests.push(...newTests);
        }

        const externalOrder = await this.externalConnection.findOneAsync([
            { field: 'orderExternalKey', operator: 'eq', value: value.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: value.owner },
        ]);

        if (!externalOrder) throw new OrderExternalKeyNotFoundError(value.orderKey, value.owner);

        return {
            patientDni: externalOrder.patientDni,
            orderId: externalOrder.orderId,
            orderExternalKey: externalOrder.orderExternalKey,
            orderExternalOwner: externalOrder.orderExternalOwner,
            tests: externalTests.map((e) => ({
                testId: e.testId,
                testExternalKey: e.testExternalKey,
                testExternalOwner: e.testExternalOwner
            }))
        };
    }
}