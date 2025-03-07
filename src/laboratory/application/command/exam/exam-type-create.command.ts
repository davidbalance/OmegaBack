import { ExamTypeConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { CreateExamTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamTypeCreateCommandPayload = CreateExamTypePayload;
export class ExamTypeCreateCommand implements CommandHandlerAsync<ExamTypeCreateCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    async handleAsync(value: ExamTypeCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new ExamTypeConflictError(value.name);

        const type = ExamType.create(value);
        await this.repository.saveAsync(type);
    }
}