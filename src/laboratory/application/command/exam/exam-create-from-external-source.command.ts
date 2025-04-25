import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { ExamExternalConnectionRepository, ExamRepository } from "../../repository/model.repositories";
import { ExamExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { ExamCreateCommandPayload } from "./exam-create.command";
import { CommandHandlerAsync } from "@shared/shared/application";

export type ExamCreateFromExternalSourceCommandPayload = ExamCreateCommandPayload & ExternalKeyCommandPayload;
export interface ExamCreateFromExternalSourceCommand extends CommandHandlerAsync<ExamCreateFromExternalSourceCommandPayload, void> { }

export class ExamCreateFromExternalSourceCommandImpl implements ExamCreateFromExternalSourceCommand {

    constructor(
        private readonly externalConnectionRepository: ExamExternalConnectionRepository,
        private readonly modelRepository: ExamRepository,
        private readonly aggregateRepository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamCreateFromExternalSourceCommandPayload): Promise<void> {
        const extenalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'examExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'examExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (extenalConnection) throw new ExamExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const type = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

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

        type.addExternalKeyToExam({ examId: examId, subtypeId: value.subtypeId, owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(type);
    }
}