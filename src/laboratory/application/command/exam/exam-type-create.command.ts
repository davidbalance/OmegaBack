import { ExamTypeConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { BaseExamTypeCreateCommand, BaseExamTypeCreateCommandPayload } from "./base.exam-type-create.command";

export type ExamTypeCreateCommandPayload = BaseExamTypeCreateCommandPayload;
export class ExamTypeCreateCommand extends BaseExamTypeCreateCommand<ExamTypeCreateCommandPayload> {

    async handleAsync(value: ExamTypeCreateCommandPayload): Promise<void> {
        const exists = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new ExamTypeConflictError(value.name);

        const type = ExamType.create(value);
        await this.aggregateRepository.saveAsync(type);
    }
}