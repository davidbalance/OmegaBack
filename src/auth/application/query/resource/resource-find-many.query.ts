import { QueryHandlerAsync } from "@shared/shared/application";
import { ResourceRepository } from "../../repository/resource/model.repositories";
import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";

export interface ResourceFindManyQuery extends QueryHandlerAsync<undefined, ResourceModel[]> {
    handleAsync(): Promise<ResourceModel[]>
}

export class ResourceFindManyQueryImpl implements ResourceFindManyQuery {
    constructor(
        private readonly repository: ResourceRepository
    ) { }

    async handleAsync(): Promise<ResourceModel[]> {
        return this.repository.findManyAsync({ filter: [] });
    }
}