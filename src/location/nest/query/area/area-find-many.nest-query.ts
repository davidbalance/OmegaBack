import { Injectable, Provider } from "@nestjs/common";
import { AreaFindManyQuery } from "@omega/location/application/query/area/area-find-many.query";
import { AreaRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { AreaFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class AreaFindManyNestQuery extends AreaFindManyQuery {
    constructor(
        @InjectModelRepository("Area") repository: AreaRepository
    ) {
        super(repository);
    }
}

export const AreaFindManyQueryProvider: Provider = {
    provide: AreaFindManyQueryToken,
    useClass: AreaFindManyNestQuery
}