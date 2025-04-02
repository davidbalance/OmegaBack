import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { BaseExamCreateCommand, BaseExamCreateCommandPayload } from "./base.exam-create.command";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { ExamExternalConnectionRepository, ExamRepository } from "../../repository/model.repositories";
import { ExamExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";

export type ExamCreateFromExternalSourceCommandPayload = BaseExamCreateCommandPayload & ExternalKeyCommandPayload;
export class ExamCreateFromExternalSourceCommand extends BaseExamCreateCommand<ExamCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: ExamExternalConnectionRepository,
        private readonly modelRepository: ExamRepository,
        aggregateRepository: ExamTypeRepository
    ) {
        super(aggregateRepository);
    }

    async handleAsync(value: ExamCreateFromExternalSourceCommandPayload): Promise<void> {
        const extenalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'examExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'examExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (extenalConnection) throw new ExamExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const type = await this.getAggregate(value);

        const exam = await this.modelRepository.findOneAsync([
            { field: 'subtypeId', operator: 'eq', value: value.subtypeId },
            { field: 'examName', operator: 'eq', value: value.examName },
        ]);
        let examId: string;
        if (!exam) {
            type.addExamToSubtype(value);
            const newBranch = [...type.subtypes.find(e => e.id === value.subtypeId)!.exams].pop()!;
            examId = newBranch.id;
        } else {
            examId = exam.examId;
        }

        type.addExamToSubtype(value);
        type.addExternalKeyToExam({ examId: examId, subtypeId: value.subtypeId, owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(type);
    }
}