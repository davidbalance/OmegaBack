import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { BranchExternalConnectionRepository, BranchRepository } from "../../repository/model.repositories";
import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchNotFoundError } from "@omega/location/core/domain/corporative/errors/branch.errors";
import { BranchExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/branch-external-key.errors";

export type BranchFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export interface BranchFindOneByExternalKeyQuery extends QueryHandlerAsync<BranchFindOneByExternalKeyQueryPayload, BranchModel> { }

export class BranchFindOneByExternalKeyQueryImpl implements BranchFindOneByExternalKeyQuery {
    constructor(
        private readonly externalConnectionRepository: BranchExternalConnectionRepository,
        private readonly modelRepository: BranchRepository
    ) { }

    async handleAsync(query: BranchFindOneByExternalKeyQueryPayload): Promise<BranchModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'branchExternalOwner', operator: 'eq', value: query.owner },
            { field: 'branchExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new BranchExternalKeyNotFoundError(query.owner, query.value);

        const branch = await this.modelRepository.findOneAsync([{ field: 'branchId', operator: 'eq', value: value.branchId }]);
        if (!branch) throw new BranchNotFoundError(value.branchId);

        return branch;
    }
}