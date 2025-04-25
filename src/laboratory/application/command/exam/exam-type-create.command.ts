import { ExamTypeConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { CreateExamTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";

export type ExamTypeCreateCommandPayload = CreateExamTypePayload;
export interface ExamTypeCreateCommand extends CommandHandlerAsync<ExamTypeCreateCommandPayload, void> { }

export class ExamTypeCreateCommandImpl implements ExamTypeCreateCommand {
    constructor(
        protected readonly aggregateRepository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamTypeCreateCommandPayload): Promise<void> {
        const exists = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new ExamTypeConflictError(value.name);

        const type = ExamType.create(value);
        await this.aggregateRepository.saveAsync(type);
    }
}