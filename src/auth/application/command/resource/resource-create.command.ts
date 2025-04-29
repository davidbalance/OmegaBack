import { CommandHandlerAsync } from "@shared/shared/application";
import { ResourceConflictError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { Resource } from "@omega/auth/core/domain/resource/resource.domain";
import { ResourceRepository } from "../../repository/resource/aggregate.repositories";
import { CreateResourcePayload } from "@omega/auth/core/domain/resource/payloads/resource.payload";

export type ResourceCreateCommandPayload = CreateResourcePayload;
export interface ResourceCreateCommand extends CommandHandlerAsync<ResourceCreateCommandPayload, void> { }

export class ResourceCreateCommandImpl implements ResourceCreateCommand {
    constructor(
        private readonly repository: ResourceRepository
    ) { }

    async handleAsync(value: ResourceCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'address', operator: 'eq', value: value.address }] });
        if (exists) throw new ResourceConflictError(value.address);

        const resource = Resource.create(value);
        await this.repository.saveAsync(resource);
    }
}