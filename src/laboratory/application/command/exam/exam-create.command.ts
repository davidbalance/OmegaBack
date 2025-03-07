import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AddExamFromTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamCreateCommandPayload = {
    typeId: string;
} & AddExamFromTypePayload;
export class ExamCreateCommand implements CommandHandlerAsync<ExamCreateCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    async handleAsync(value: ExamCreateCommandPayload): Promise<void> {
        const type = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

        type.addExamToSubtype(value);
        await this.repository.saveAsync(type);
    }
}