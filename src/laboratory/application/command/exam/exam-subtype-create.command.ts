import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { AddSubtypeToTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";

export type ExamSubtypeCreateCommandPayload = {
    typeId: string;
} & AddSubtypeToTypePayload;
export interface ExamSubtypeCreateCommand extends CommandHandlerAsync<ExamSubtypeCreateCommandPayload, void> { }

export class ExamSubtypeCreateCommandImpl implements ExamSubtypeCreateCommand {
    constructor(
        protected readonly aggregateRepository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamSubtypeCreateCommandPayload): Promise<void> {
        const type = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        type.addSubtype(value);
        await this.aggregateRepository.saveAsync(type);
    }
}