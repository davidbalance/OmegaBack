import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";

export type ExamSubtypeMoveCommandPayload = {
    fromTypeId: string;
    toTypeId: string;
    subtypeId: string;
};
export class ExamSubtypeMoveCommand implements CommandHandlerAsync<ExamSubtypeMoveCommandPayload, void> {
    constructor(
        private readonly repository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamSubtypeMoveCommandPayload): Promise<void> {
        const fromType = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.fromTypeId }] });
        if (!fromType) throw new ExamTypeNotFoundError(value.fromTypeId);

        const toType = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.toTypeId }] });
        if (!toType) throw new ExamTypeNotFoundError(value.toTypeId);

        fromType.moveSubtypeTo(toType, value.subtypeId);
        await this.repository.saveAsync(fromType);
    }
}