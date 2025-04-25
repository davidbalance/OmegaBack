import { TestModel } from "@omega/medical/core/model/test/test.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { OrderExternalConnectionRepository } from "../../repository/model.repositories";
import { TestFindManyQuery } from "./test-find-many.query";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

export type TestFindManyByExternalKeyQueryPayload = ExternalKeyProps;

export interface TestFindManyByExternalKeyQuery extends QueryHandlerAsync<TestFindManyByExternalKeyQueryPayload, TestModel[]> { }

export class TestFindManyByExternalKeyQueryImpl implements TestFindManyByExternalKeyQuery {
    constructor(
        private readonly externalConnectionRepository: OrderExternalConnectionRepository,
        private readonly testQuery: TestFindManyQuery,
    ) { }

    async handleAsync(query: TestFindManyByExternalKeyQueryPayload): Promise<TestModel[]> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new OrderExternalKeyNotFoundError(query.owner, query.value);
        return this.testQuery.handleAsync({ orderId: value.orderId });
    }
}