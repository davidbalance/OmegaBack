import { Injectable, Provider } from "@nestjs/common";
import { ExamCreateCommand } from "@omega/laboratory/application/command/exam/exam-create.command";
import { ExamExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-external-source.resolver";
import { ExamExternalKeyNotFoundError } from "@omega/laboratory/core/domain/exam/errors/exam-external-key.errors";
import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { ExamExternalSourceResolverToken } from "../inject/resolver.inject";
import { ExamCreateFromExternalSourceCommand } from "@omega/laboratory/application/command/exam/exam-create-from-external-source.command";

@Injectable()
export class ExamExternalSourceNestResolver implements ExamExternalSourceResolver {
    constructor(
        @InjectModelRepository("ExamExternalConnection") private readonly externalConnection: ExamExternalConnectionRepository,
        @InjectCommand("ExamCreateFromExternalSource") private readonly createCommand: ExamCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; examKey: string; examName: string; typeId: string; subtypeId: string; }): Promise<ExamExternalConnectionModel> {
        const filter: Filter<ExamExternalConnectionModel>[] = [
            { field: 'examExternalKey', operator: 'eq', value: value.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalExam = await this.externalConnection.findOneAsync(filter);

        if (!externalExam) {
            await this.createCommand.handleAsync({
                externalKeyOwner: value.owner,
                externalKeyValue: value.examKey,
                examName: value.examName,
                subtypeId: value.subtypeId,
                typeId: value.typeId
            });
            externalExam = await this.externalConnection.findOneAsync(filter);
            if (!externalExam) throw new ExamExternalKeyNotFoundError(value.owner, value.examKey);
        }
        return externalExam;
    }
}

export const ExamExternalSourceResolverProvider: Provider = {
    provide: ExamExternalSourceResolverToken,
    useClass: ExamExternalSourceNestResolver
}