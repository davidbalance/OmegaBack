
import { ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ManagementRepository } from "../../repository/model.repositories";

export type ManagementFindOneByNameQueryPayload = {
    managementName: string;
}
export interface ManagementFindOneByNameQuery extends QueryHandlerAsync<ManagementFindOneByNameQueryPayload, ManagementModel> { }

export class ManagementFindOneByNameQueryImpl implements ManagementFindOneByNameQuery {
    constructor(
        private readonly repository: ManagementRepository
    ) { }

    async handleAsync(query: ManagementFindOneByNameQueryPayload): Promise<ManagementModel> {
        const value = await this.repository.findOneAsync([{ field: 'managementName', operator: 'eq', value: query.managementName }]);
        if (!value) throw new ManagementNotFoundError(query.managementName);
        return value;
    }
}