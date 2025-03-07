import { CommandHandlerAsync } from "@shared/shared/application";
import { ManagementRepository } from "../../repository/aggregate.repositories";
import { ManagementConflictError, ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";

export type ManagementEditCommandPayload = {
    managementId: string;
    managementName: string;
};
export class ManagementEditCommand implements CommandHandlerAsync<ManagementEditCommandPayload, void> {
    constructor(
        private readonly repository: ManagementRepository
    ) { }
    
    async handleAsync(value: ManagementEditCommandPayload): Promise<void> {
        const management = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.managementId }] });
        if (!management) throw new ManagementNotFoundError(value.managementId);

        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.managementName }] });
        if (exists) throw new ManagementConflictError(value.managementName);

        management.rename(value.managementName);
        await this.repository.saveAsync(management);
    }
}