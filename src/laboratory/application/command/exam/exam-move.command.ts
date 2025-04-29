import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { MoveExamPayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";

export type ExamMoveCommandPayload = {
    fromTypeId: string;
    toTypeId: string;
} & MoveExamPayload;
export interface ExamMoveCommand extends CommandHandlerAsync<ExamMoveCommandPayload, void> { }

export class ExamMoveCommandImpl implements ExamMoveCommand {
    constructor(
        private readonly repository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamMoveCommandPayload): Promise<void> {
        const fromType = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.fromTypeId }] });
        if (!fromType) throw new ExamTypeNotFoundError(value.fromTypeId);

        const toType = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.toTypeId }] });
        if (!toType) throw new ExamTypeNotFoundError(value.toTypeId);

        fromType.moveExamTo(toType, value);
        await this.repository.saveAsync(fromType);
    }
}