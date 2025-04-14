import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AddSubtypeToTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type BaseExamSubtypeCreateCommandPayload = {
    typeId: string;
} & AddSubtypeToTypePayload;
export abstract class BaseExamSubtypeCreateCommand<T extends BaseExamSubtypeCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    protected async getAggregate(value: T): Promise<ExamType> {
        const type = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);
        return type;
    }

    abstract handleAsync(value: T): Promise<void>;
}