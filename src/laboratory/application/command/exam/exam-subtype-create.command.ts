import { BaseExamSubtypeCreateCommand, BaseExamSubtypeCreateCommandPayload } from "./base.exam-subtype-create.command";

export type ExamSubtypeCreateCommandPayload = BaseExamSubtypeCreateCommandPayload;
export class ExamSubtypeCreateCommand extends BaseExamSubtypeCreateCommand<ExamSubtypeCreateCommandPayload> {

    async handleAsync(value: ExamSubtypeCreateCommandPayload): Promise<void> {
        const type = await this.getAggregate(value);

        type.addSubtype(value);
        await this.aggregateRepository.saveAsync(type);
    }
}