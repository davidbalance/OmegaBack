import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { ExamTypeRepository } from "../../repository/aggregate.repositories";
import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "../../repository/model.repositories";
import { ExamSubtypeExternalKeyConflictError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";
import { ExamTypeNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ExamSubtypeCreateCommandPayload } from "./exam-subtype-create.command";

export type ExamSubtypeCreateFromExternalSourceCommandPayload = ExamSubtypeCreateCommandPayload & ExternalKeyCommandPayload;
export interface ExamSubtypeCreateFromExternalSourceCommand extends CommandHandlerAsync<ExamSubtypeCreateFromExternalSourceCommandPayload, void> { }

export class ExamSubtypeCreateFromExternalSourceCommandImpl implements ExamSubtypeCreateFromExternalSourceCommand {

    constructor(
        private readonly externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        private readonly modelRepository: ExamSubtypeRepository,
        private readonly aggregateRepository: ExamTypeRepository
    ) { }

    async handleAsync(value: ExamSubtypeCreateFromExternalSourceCommandPayload): Promise<void> {
        const extenalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'subtypeExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'subtypeExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (extenalConnection) throw new ExamSubtypeExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const type = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.typeId }] });
        if (!type) throw new ExamTypeNotFoundError(value.typeId);

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