import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";

export type ExamSubtypeRemoveCommandPayload = {
    typeId: string;
    subtypeId: string;
}
export interface ExamSubtypeRemoveCommand extends CommandHandlerAsync<ExamSubtypeRemoveCommandPayload, void> { }

export class ExamSubtypeRemoveCommandImpl implements ExamSubtypeRemoveCommand {
    constructor(
        private readonly repository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamSubtypeRemoveCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        type.removeSubtype(value.subtypeId);
        await this.repository.saveAsync(type);
    }
}