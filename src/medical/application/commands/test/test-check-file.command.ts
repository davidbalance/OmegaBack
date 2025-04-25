import { CommandHandlerAsync } from "@shared/shared/application";
import { TestFileResultRepository } from "../../repository/model.repositories";
import { Filter, FilterGroup } from "@shared/shared/domain";
import { TestFileResultModel } from "@omega/medical/core/model/test/test-file-result.model";
import { ResultGetFileQuery } from "../../queries/test/result-get-file.query";

export interface TestCheckFileCommand extends CommandHandlerAsync<undefined, void> {
    handleAsync(): Promise<void>;
}

export class TestCheckFileCommandImpl implements TestCheckFileCommand {
    constructor(
        private readonly model: TestFileResultRepository,
        private readonly file: ResultGetFileQuery
    ) { }

    async handleAsync(): Promise<void> {
        const take: number = 100;
        let skip: number = 0;
        const filter: (FilterGroup<TestFileResultModel> | Filter<TestFileResultModel>)[] = [{ field: 'resultHasFile', operator: 'eq', value: true }];

        const totalCount = await this.model.countAsync(filter);
        const pagination = Math.ceil(totalCount / take);
        for (let i = 0; i < pagination; i++) {
            const data = await this.model.findManyAsync({
                filter: filter,
                limit: take,
                skip: 0 + skip
            });

            const promises = data.map(async (value) => {
                try {
                    await this.file.handleAsync({ testId: value.testId });
                    return 1;
                } catch (error) {
                    console.error(`Iteration: ${i.toString().padStart(6, ' ')} - Error handling file for testId: ${value.resultFilepath}`);
                    return 0;
                }
            });

            const values = await Promise.all(promises);
            skip += values.reduce((prev, curr) => prev + curr, 0);
        }
    }
}