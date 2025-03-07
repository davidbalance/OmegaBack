import { Injectable, Provider } from "@nestjs/common";
import { ResourceFindOneQuery } from "@omega/auth/application/query/resource/resource-find-one.query";
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResourceFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class ResourceFindOneNestQuery extends ResourceFindOneQuery {
    constructor(
        @InjectModelRepository('Resource') repository: ResourceRepository
    ) {
        super(repository);
    }
}

export const ResourceFindOneQueryProvider: Provider = {
    provide: ResourceFindOneQueryToken,
    useClass: ResourceFindOneNestQuery
}