import { BaseExamCreateCommand, BaseExamCreateCommandPayload } from "./base.exam-create.command";

export type ExamCreateCommandPayload = BaseExamCreateCommandPayload;
export class ExamCreateCommand extends BaseExamCreateCommand<ExamCreateCommandPayload> {

    async handleAsync(value: ExamCreateCommandPayload): Promise<void> {
        const type = await this.getAggregate(value);

        type.addExamToSubtype(value);
        await this.aggregateRepository.saveAsync(type);
    }
}