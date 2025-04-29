import { ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ManagementRepository } from "../../repository/aggregate.repositories";

export type ManagementRemoveCommandPayload = {
    managementId: string;
};
export interface ManagementRemoveCommand extends CommandHandlerAsync<ManagementRemoveCommandPayload, void> { }

export class ManagementRemoveCommandImpl implements CommandHandlerAsync<ManagementRemoveCommandPayload, void> {
    constructor(
        private readonly repository: ManagementRepository
    ) { }

    async handleAsync(value: ManagementRemoveCommandPayload): Promise<void> {
        const management = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.managementId }] });
        if (!management) throw new ManagementNotFoundError(value.managementId);

        management.remove();
        await this.repository.saveAsync(management);
    }
}