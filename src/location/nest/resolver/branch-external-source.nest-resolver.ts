import { Injectable, Provider } from "@nestjs/common";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { BranchExternalSourceResolver } from "@omega/location/application/resolver/branch-external-source.resolver";
import { BranchExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { BranchCreateFromExternalSourceCommand } from "@omega/location/application/command/corporative/branch-create-from-external-source.command";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { BranchExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/branch-external-key.errors";
import { BranchExternalSourceResolverToken } from "../inject/resolver.inject";

@Injectable()
export class BranchExternalSourceNestResolver implements BranchExternalSourceResolver {
    constructor(
        @InjectModelRepository("BranchExternalConnection") private readonly externalConnection: BranchExternalConnectionRepository,
        @InjectCommand("BranchCreateFromExternalSource") private readonly createCommand: BranchCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; corporativeId: string; companyId: string; cityId: number; branchKey: string; branchName: string; }): Promise<BranchExternalConnectionModel> {
        const filter: Filter<BranchExternalConnectionModel>[] = [
            { field: 'branchExternalKey', operator: 'eq', value: value.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalBranch = await this.externalConnection.findOneAsync(filter);

        if (!externalBranch) {
            await this.createCommand.handleAsync({
                externalKeyOwner: value.owner,
                externalKeyValue: value.branchKey,
                cityId: value.cityId,
                companyId: value.companyId,
                corporativeId: value.corporativeId,
                name: value.branchName
            });
            externalBranch = await this.externalConnection.findOneAsync(filter);
            if (!externalBranch) throw new BranchExternalKeyNotFoundError(value.owner, value.branchKey);
        }
        return externalBranch;
    }


}

export const BranchExternalSourceResolverProvider: Provider = {
    provide: BranchExternalSourceResolverToken,
    useClass: BranchExternalSourceNestResolver
}