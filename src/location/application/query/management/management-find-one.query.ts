
import { ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ManagementRepository } from "../../repository/model.repositories";

export type ManagementFindOneQueryPayload = {
    managementId: string;
}
export class ManagementFindOneQuery implements QueryHandlerAsync<ManagementFindOneQueryPayload, ManagementModel> {
    constructor(
        private readonly repository: ManagementRepository
    ) { }

    async handleAsync(query: ManagementFindOneQueryPayload): Promise<ManagementModel> {
        const value = await this.repository.findOneAsync([{ field: 'managementId', operator: 'eq', value: query.managementId }]);
        if (!value) throw new ManagementNotFoundError(query.managementId);
        return value;
    }
}