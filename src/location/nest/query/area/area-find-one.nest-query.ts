import { Injectable, Provider } from "@nestjs/common";
import { AreaFindOneQueryImpl } from "@omega/location/application/query/area/area-find-one.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { AreaFindOneQueryToken } from "../../inject/query.inject";
import { AreaRepository } from "@omega/location/application/repository/model.repositories";

@Injectable()
class AreaFindOneNestQuery extends AreaFindOneQueryImpl {
    constructor(
        @InjectModelRepository("Area") repository: AreaRepository
    ) {
        super(repository);
    }
}

export const AreaFindOneQueryProvider: Provider = {
    provide: AreaFindOneQueryToken,
    useClass: AreaFindOneNestQuery
}