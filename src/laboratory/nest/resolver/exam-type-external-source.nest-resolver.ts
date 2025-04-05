import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { ExamTypeExternalSourceResolverToken } from "../inject/resolver.inject";
import { ExamTypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-type-external-source.resolver";
import { ExamTypeCreateFromExternalSourceCommand } from "@omega/laboratory/application/command/exam/exam-type-create-from-external-source.command";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors";

@Injectable()
export class ExamTypeExternalSourceNestResolver implements ExamTypeExternalSourceResolver {
    constructor(
        @InjectModelRepository("ExamTypeExternalConnection") private readonly externalConnection: ExamTypeExternalConnectionRepository,
        @InjectCommand("ExamTypeCreateFromExternalSource") private readonly createCommand: ExamTypeCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; typeKey: string; typeName: string; }): Promise<ExamTypeExternalConnectionModel> {
        const filter: Filter<ExamTypeExternalConnectionModel>[] = [
            { field: 'typeExternalOwner', operator: 'eq', value: value.owner },
            { field: 'typeExternalKey', operator: 'eq', value: value.typeKey },
        ]
        let externalExam = await this.externalConnection.findOneAsync(filter);
        if (!externalExam) {
            await this.createCommand.handleAsync({
                externalKeyOwner: value.owner,
                externalKeyValue: value.typeKey,
                name: value.typeName
            });
            externalExam = await this.externalConnection.findOneAsync(filter);
            if (!externalExam) throw new ExamTypeExternalKeyNotFoundError(value.owner, value.typeKey);
        }
        return externalExam;
    }

}

export const ExamTypeExternalSourceResolverProvider: Provider = {
    provide: ExamTypeExternalSourceResolverToken,
    useClass: ExamTypeExternalSourceNestResolver
}