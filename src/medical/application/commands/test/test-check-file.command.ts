import { CommandHandlerAsync } from "@shared/shared/application";
import { TestFileResultRepository } from "../../repository/model.repositories";
import { Filter, FilterGroup } from "@shared/shared/domain";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";
import { FileOperation } from "@shared/shared/providers";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ResultFileRemoveBatchEvent, ResultFileRemovedEvent } from "@omega/medical/core/domain/test/events/result.events";

export class TestCheckFileCommand implements CommandHandlerAsync<undefined, void> {
    constructor(
        private readonly model: TestFileResultRepository,
        private readonly repository: TestRepository,
        private readonly file: FileOperation
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

            const promises = data.map(async (e) => ({
                testId: e.testId,
                hasFile: await this.hasFile(e.resultFilepath),
            }))
            const values = await Promise.all(promises);

            const ids = values.filter(e => !e.hasFile).map(e => e.testId);
            await this.repository.batchAsync(new ResultFileRemoveBatchEvent(ids));
        }
    }

    private async hasFile(filepath: string): Promise<boolean> {
        try {
            await this.file.read(filepath)
            return true;
        } catch (error) {
            return false;
        }
    }
}