import { CommandHandlerAsync } from "@shared/shared/application";
import { AddExamFromTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";

export type ExamCreateCommandPayload = {
    typeId: string;
} & AddExamFromTypePayload;
export interface ExamCreateCommand extends CommandHandlerAsync<ExamCreateCommandPayload, void> { }

export class ExamCreateCommandImpl implements ExamCreateCommand {
    constructor(
        protected readonly repository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamCreateCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        type.addExamToSubtype(value);
        await this.repository.saveAsync(type);
    }
}