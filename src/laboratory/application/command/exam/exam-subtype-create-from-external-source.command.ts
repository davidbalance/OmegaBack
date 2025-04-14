import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "../../repository/model.repositories";
import { BaseExamSubtypeCreateCommand, BaseExamSubtypeCreateCommandPayload } from "./base.exam-subtype-create.command";
import { ExamSubtypeExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";

export type ExamSubtypeCreateFromExternalSourceCommandPayload = BaseExamSubtypeCreateCommandPayload & ExternalKeyCommandPayload;
export class ExamSubtypeCreateFromExternalSourceCommand extends BaseExamSubtypeCreateCommand<ExamSubtypeCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        private readonly modelRepository: ExamSubtypeRepository,
        aggregateRepository: ExamTypeRepository
    ) {
        super(aggregateRepository);
    }

    async handleAsync(value: ExamSubtypeCreateFromExternalSourceCommandPayload): Promise<void> {
        const extenalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'subtypeExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'subtypeExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (extenalConnection) throw new ExamSubtypeExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const type = await this.getAggregate(value);

        const subtype = await this.modelRepository.findOneAsync([
            { field: 'typeId', operator: 'eq', value: value.typeId },
            { field: 'subtypeName', operator: 'eq', value: value.subtypeName },
        ]);
        let subtypeId: string;
        if (!subtype) {
            type.addSubtype(value);
            const newSubtype = [...type.subtypes].pop()!;
            subtypeId = newSubtype.id;
        } else {
            subtypeId = subtype.subtypeId;
        }

        type.addExternalKeyToSubtype({ subtypeId: subtypeId, owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(type);
    }
}