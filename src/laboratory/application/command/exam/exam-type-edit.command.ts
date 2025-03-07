import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamTypeEditCommandPayload = {
    testId: string;
    testName: string;
}
export class ExamTypeEditCommand implements CommandHandlerAsync<ExamTypeEditCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    async handleAsync(value: ExamTypeEditCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!type) throw new ExamTypeNotFoundError(value.testId);

        type.rename(value.testName);
        await this.repository.saveAsync(type);
    }
}