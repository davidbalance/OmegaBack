import { QueryHandlerAsync } from "@shared/shared/application";
import { ResourceRepository } from "../../repository/resource/model.repositories";
import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";

export type ResourceFindOneQueryPayload = {
    resourceId: string;
}
export class ResourceFindOneQuery implements QueryHandlerAsync<ResourceFindOneQueryPayload, ResourceModel> {
    constructor(
        private readonly repository: ResourceRepository
    ) { }

    async handleAsync(value: ResourceFindOneQueryPayload): Promise<ResourceModel> {
        const resource = await this.repository.findOneAsync([{ field: 'resourceId', operator: 'eq', value: value.resourceId }]);
        if (!resource) throw new ResourceNotFoundError(value.resourceId);
        return resource;
    }
}