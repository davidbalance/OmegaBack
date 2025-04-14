import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { ExamSubtypeExternalSourceResolverToken } from "../inject/resolver.inject";
import { ExamSubtypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-subtype-external-source.resolver";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeCreateFromExternalSourceCommand } from "@omega/laboratory/application/command/exam/exam-subtype-create-from-external-source.command";
import { ExamSubtypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors";

@Injectable()
export class ExamSubtypeExternalSourceNestResolver implements ExamSubtypeExternalSourceResolver {
    constructor(
        @InjectModelRepository("ExamSubtypeExternalConnection") private readonly externalConnection: ExamSubtypeExternalConnectionRepository,
        @InjectCommand("ExamSubtypeCreateFromExternalSource") private readonly createCommand: ExamSubtypeCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; subtypeKey: string; subtypeName: string; typeId: string; }): Promise<ExamSubtypeExternalConnectionModel> {
        const filter: Filter<ExamSubtypeExternalConnectionModel>[] = [
            { field: 'subtypeExternalKey', operator: 'eq', value: value.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalExam = await this.externalConnection.findOneAsync(filter);

        if (!externalExam) {
            await this.createCommand.handleAsync({
                externalKeyOwner: value.owner,
                externalKeyValue: value.subtypeKey,
                subtypeName: value.subtypeName,
                typeId: value.typeId
            });
            externalExam = await this.externalConnection.findOneAsync(filter);
            if (!externalExam) throw new ExamSubtypeExternalKeyNotFoundError(value.owner, value.subtypeKey);
        }
        return externalExam;
    }

}

export const ExamSubtypeExternalSourceResolverProvider: Provider = {
    provide: ExamSubtypeExternalSourceResolverToken,
    useClass: ExamSubtypeExternalSourceNestResolver
}