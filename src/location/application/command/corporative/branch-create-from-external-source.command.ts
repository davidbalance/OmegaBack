import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { CorporativeRepository } from "../../repository/aggregate.repositories";
import { BaseBranchCreateCommand, BaseBranchCreateCommandPayload } from "./base.branch-create.command";
import { BranchExternalConnectionRepository, BranchRepository } from "../../repository/model.repositories";
import { BranchExternalKeyConflictError } from "@omega/location/core/domain/corporative/errors/branch-external-key.errors";

export type BranchCreateFromExternalSourceCommandPayload = BaseBranchCreateCommandPayload & ExternalKeyCommandPayload;
export class BranchCreateFromExternalSourceCommand extends BaseBranchCreateCommand<BranchCreateFromExternalSourceCommandPayload> {

    constructor(
        private readonly externalConnectionRepository: BranchExternalConnectionRepository,
        private readonly modelRepository: BranchRepository,
        agggregateRepository: CorporativeRepository,
    ) {
        super(agggregateRepository);
    }

    async handleAsync(value: BranchCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'branchExternalOwner', operator: 'eq', value: value.externalKeyOwner },
            { field: 'branchExternalKey', operator: 'eq', value: value.externalKeyValue },
        ]);
        if (externalConnection) throw new BranchExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const corporative = await this.getAggregate(value);

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