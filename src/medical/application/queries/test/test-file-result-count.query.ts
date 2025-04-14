import { QueryHandlerAsync } from "@shared/shared/application";
import { TestFileResultRepository } from "../../repository/model.repositories";

export type TestFileResultCount = {
    total: number;
    found: number;
    notFound: number;
}
export class TestFileResultCountQuery implements QueryHandlerAsync<undefined, TestFileResultCount> {
    constructor(
        private readonly repository: TestFileResultRepository,
    ) { }

    async handleAsync(): Promise<TestFileResultCount> {
        const found = await this.repository.countAsync([{ field: 'resultHasFile', operator: 'eq', value: true }]);
        const notFound = await this.repository.countAsync([{ field: 'resultHasFile', operator: 'eq', value: false }]);

        return {
            total: found + notFound,
            found: found,
            notFound: notFound
        }
    }
}