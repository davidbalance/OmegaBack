import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamTypeRemoveCommandPayload = {
    testId: string;
}
export class ExamTypeRemoveCommand implements CommandHandlerAsync<ExamTypeRemoveCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    async handleAsync(value: ExamTypeRemoveCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!type) throw new ExamTypeNotFoundError(value.testId);

        type.remove();
        await this.repository.saveAsync(type);
    }
}