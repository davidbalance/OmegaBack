import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { CreateExamTypePayload } from "@omega/laboratory/core/domain/exam/payloads/exam-type.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";

export type BaseExamTypeCreateCommandPayload = CreateExamTypePayload;
export abstract class BaseExamTypeCreateCommand<T extends BaseExamTypeCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: AggregateRepository<ExamTypeProps, ExamType>
    ) { }

    protected createType(value: T): ExamType {
        return ExamType.create(value);
    }

    abstract handleAsync(value: T): Promise<void>;
}