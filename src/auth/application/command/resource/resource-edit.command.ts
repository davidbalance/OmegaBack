import { CommandHandlerAsync } from "@shared/shared/application";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { ResourceRepository } from "../../repository/resource/aggregate.repositories";
import { EditResourcePayload } from "@omega/auth/core/domain/resource/payloads/resource.payload";

export type ResourceEditCommandPayload = EditResourcePayload & {
    resourceId: string
};
export interface ResourceEditCommand extends CommandHandlerAsync<ResourceEditCommandPayload, void> { }

export class ResourceEditCommandImpl implements ResourceEditCommand {
    constructor(
        private readonly repository: ResourceRepository
    ) { }

    async handleAsync(value: ResourceEditCommandPayload): Promise<void> {
        const resource = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.resourceId }] });
        if (!resource) throw new ResourceNotFoundError(value.resourceId);

        resource.edit(value);
        await this.repository.saveAsync(resource);
    }
}