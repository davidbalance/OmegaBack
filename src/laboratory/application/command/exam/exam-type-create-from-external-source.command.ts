import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { BaseExamTypeCreateCommand, BaseExamTypeCreateCommandPayload } from "./base.exam-type-create.command";
import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { ExamTypeExternalConnectionRepository } from "../../repository/model.repositories";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { ExamTypeExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";

export type ExamTypeCreateFromExternalSourceCommandPayload = BaseExamTypeCreateCommandPayload & ExternalKeyCommandPayload;
export class ExamTypeCreateFromExternalSourceCommand extends BaseExamTypeCreateCommand<ExamTypeCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: ExamTypeExternalConnectionRepository,
        aggregateRepository: ExamTypeRepository
    ) {
        super(aggregateRepository);
    }

    async handleAsync(value: ExamTypeCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'typeExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'typeExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new ExamTypeExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        let type = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (!type) {
            type = ExamType.create(value);
        }

        type.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(type);
    }
}