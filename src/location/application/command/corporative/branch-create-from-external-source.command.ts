import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { BranchExternalConnectionRepository, BranchRepository } from "../../repository/model.repositories";
import { BranchExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/branch-external-key.errors";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { BranchCreateCommandPayload } from "./branch-create.command";
import { CommandHandlerAsync } from "@shared/shared/application";

export type BranchCreateFromExternalSourceCommandPayload = BranchCreateCommandPayload & ExternalKeyCommandPayload;
export interface BranchCreateFromExternalSourceCommand extends CommandHandlerAsync<BranchCreateFromExternalSourceCommandPayload, void> { }

export class BranchCreateFromExternalSourceCommandImpl implements BranchCreateFromExternalSourceCommand {

    constructor(
        private readonly externalConnectionRepository: BranchExternalConnectionRepository,
        private readonly modelRepository: BranchRepository,
        private readonly repository: CorporativeRepository,
    ) { }

    async handleAsync(value: BranchCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'branchExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'branchExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new BranchExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const corporative = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.corporativeId }] });
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        const branch = await this.modelRepository.findOneAsync([
            { field: 'companyId', operator: 'eq', value: value.companyId },
            { field: 'branchName', operator: 'eq', value: value.name },
        ]);
        let branchId: string;
        if (!branch) {
            corporative.addBranchToCompany(value);
            const newBranch = [...corporative.companies.find(e => e.id === value.companyId)!.branches].pop()!;
            branchId = newBranch.id;
        } else {
            branchId = branch.branchId;
        }

        corporative.addExternalKeyToBranch({ branchId: branchId, companyId: value.companyId, owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.repository.saveAsync(corporative);
    }
}