import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AddExamFromTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";

export type BaseExamCreateCommandPayload = {
    typeId: string;
} & AddExamFromTypePayload;
export abstract class BaseExamCreateCommand<T extends BaseExamCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: ExamTypeRepository
    ) { }

    protected async getAggregate(value: T): Promise<ExamType> {
        const type = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);
        return type;
    }

    abstract handleAsync(value: T): Promise<void>;
}