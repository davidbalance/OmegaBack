import { Injectable, Provider } from "@nestjs/common";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { CorporativeExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeCreateFromExternalSourceCommand } from "@omega/location/application/command/corporative/corporative-create-from-external-source.command";
import { CorporativeExternalSourceResolver } from "@omega/location/application/resolver/corporative-external-source.resolver";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative-external-key.errors";
import { CorporativeExternalSourceResolverToken } from "../inject/resolver.inject";

@Injectable()
export class CorporativeExternalSourceNestResolver implements CorporativeExternalSourceResolver {
    constructor(
        @InjectModelRepository("CorporativeExternalConnection") private readonly externalConnection: CorporativeExternalConnectionRepository,
        @InjectCommand("CorporativeCreateFromExternalSource") private readonly createCommand: CorporativeCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; corporativeKey: string; corporativeName: string; }): Promise<CorporativeExternalConnectionModel> {
        const filter: Filter<CorporativeExternalConnectionModel>[] = [
            { field: 'corporativeExternalKey', operator: 'eq', value: value.corporativeKey },
            { field: 'corporativeExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalExam = await this.externalConnection.findOneAsync(filter);

        if (!externalExam) {
            await this.createCommand.handleAsync({
                externalKeyOwner: value.owner,
                externalKeyValue: value.corporativeKey,
                name: value.corporativeName
            });
            externalExam = await this.externalConnection.findOneAsync(filter);
            if (!externalExam) throw new CorporativeExternalKeyNotFoundError(value.owner, value.corporativeKey);
        }
        return externalExam;
    }
}

export const CorporativeExternalSourceResolverProvider: Provider = {
    provide: CorporativeExternalSourceResolverToken,
    useClass: CorporativeExternalSourceNestResolver
}