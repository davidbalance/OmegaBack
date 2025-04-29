import { ManagementConflictError } from "@omega/location/core/domain/management/errors/management.errors";
import { Management } from "@omega/location/core/domain/management/management.domain";
import { CreateManagementPayload } from "@omega/location/core/domain/management/payloads/management.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { ManagementRepository } from "../../repository/aggregate.repositories";

export type ManagementCreateCommandPayload = CreateManagementPayload;
export interface ManagementCreateCommand extends CommandHandlerAsync<ManagementCreateCommandPayload, void> { }

export class ManagementCreateCommandImpl implements ManagementCreateCommand {
    constructor(
        private readonly repository: ManagementRepository
    ) { }

    async handleAsync(value: CreateManagementPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new ManagementConflictError(value.name);

        const management = Management.create(value);
        await this.repository.saveAsync(management);
    }
}