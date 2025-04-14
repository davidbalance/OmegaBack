import { Injectable, Provider } from "@nestjs/common";
import { ResourceFindManyQuery } from "@omega/auth/application/query/resource/resource-find-many.query";
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResourceFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class ResourceFindManyNestQuery extends ResourceFindManyQuery {
    constructor(
        @InjectModelRepository('Resource') repository: ResourceRepository
    ) {
        super(repository);
    }
}

export const ResourceFindManyQueryProvider: Provider = {
    provide: ResourceFindManyQueryToken,
    useClass: ResourceFindManyNestQuery
}