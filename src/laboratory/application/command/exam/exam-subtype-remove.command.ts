import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamSubtypeRemoveCommandPayload = {
    typeId: string;
    subtypeId: string;
}
export class ExamSubtypeRemoveCommand implements CommandHandlerAsync<ExamSubtypeRemoveCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    async handleAsync(value: ExamSubtypeRemoveCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        type.removeSubtype(value.subtypeId);
        await this.repository.saveAsync(type);
    }
}