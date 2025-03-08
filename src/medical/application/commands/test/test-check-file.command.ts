import { CommandHandlerAsync } from "@shared/shared/application";
import { TestFileResultRepository } from "../../repository/model.repositories";
import { Filter, FilterGroup } from "@shared/shared/domain";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";
import { ResultGetFileQuery } from "../../queries/test/result-get-file.query";

export class TestCheckFileCommand implements CommandHandlerAsync<undefined, void> {
    constructor(
        private readonly model: TestFileResultRepository,
        private readonly file: ResultGetFileQuery
    ) { }

    async handleAsync(): Promise<void> {
        const take: number = 100;
        const filter: (FilterGroup<TestFileResultModel> | Filter<TestFileResultModel>)[] = [{ field: 'resultHasFile', operator: 'eq', value: true }];

        const totalCount = await this.model.countAsync(filter);
        const pagination = Math.ceil(totalCount / take);
        for (let i = 0; i < pagination; i++) {
            const data = await this.model.findManyAsync({
                filter: filter,
                limit: take,
                skip: i * take
            });

            const promises = data.map(async (value) => {
                try {
                    await this.file.handleAsync({ testId: value.testId });
                } catch (error) {
                    console.error(`Error handling file for testId ${value.testId}:`);
                }
            });

            await Promise.all(promises);
        }
    }
}