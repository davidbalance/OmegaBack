import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { RemoveExamFromTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamRemoveCommandPayload = {
    typeId: string;
} & RemoveExamFromTypePayload;
export interface ExamRemoveCommand extends CommandHandlerAsync<ExamRemoveCommandPayload, void> { }

export class ExamRemoveCommandImpl implements ExamRemoveCommand {
    constructor(
        private readonly repository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    async handleAsync(value: ExamRemoveCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        type.removeExamFromSubtype(value);
        await this.repository.saveAsync(type);
    }
}