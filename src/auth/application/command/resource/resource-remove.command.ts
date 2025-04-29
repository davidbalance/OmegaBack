import { CommandHandlerAsync } from "@shared/shared/application";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { ResourceRepository } from "../../repository/resource/aggregate.repositories";

export type ResourceRemoveCommandPayload = {
    resourceId: string
};
export interface ResourceRemoveCommand extends CommandHandlerAsync<ResourceRemoveCommandPayload, void> { }

export class ResourceRemoveCommandImpl implements ResourceRemoveCommand {
    constructor(
        private readonly repository: ResourceRepository
    ) { }

    async handleAsync(value: ResourceRemoveCommandPayload): Promise<void> {
        const resource = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.resourceId }] });
        if (!resource) throw new ResourceNotFoundError(value.resourceId);

        resource.remove();
        await this.repository.saveAsync(resource);
    }
}