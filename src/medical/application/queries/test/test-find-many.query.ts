import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order } from "@shared/shared/domain";
import { ModelRepository } from "@shared/shared/providers/model.repository";
import { TestModel } from "@omega/medical/core/model/test/test.model";

export type TestFindManyQueryPayload = {
    orderId: string;
    filter?: string;
} & Order<TestModel>;

export interface TestFindManyQuery extends QueryHandlerAsync<TestFindManyQueryPayload, TestModel[]> { }

export class TestFindManyQueryImpl implements TestFindManyQuery {
    constructor(
        private readonly repository: ModelRepository<TestModel>
    ) { }

    async handleAsync(query: TestFindManyQueryPayload): Promise<TestModel[]> {
        const filter: Filter<TestModel>[] = [{ field: 'orderId', operator: 'eq', value: query.orderId }];
        if (query.filter) {
            filter.push({ field: 'examName', operator: 'like', value: query.filter });
        }

        return this.repository.findManyAsync({
            ...query,
            filter: filter
        });
    }
}