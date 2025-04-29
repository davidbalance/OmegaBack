import { Injectable, Provider } from "@nestjs/common";
import { AreaOptionRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { AreaFindOptionsQueryImpl } from "@omega/location/application/query/area/area-find-options.query";
import { AreaFindOptionsQueryToken } from "../../inject/query.inject";

@Injectable()
class AreaFindOptionsNestQuery extends AreaFindOptionsQueryImpl {
    constructor(
        @InjectModelRepository("AreaOption") repository: AreaOptionRepository
    ) {
        super(repository);
    }
}

export const AreaFindOptionsQueryProvider: Provider = {
    provide: AreaFindOptionsQueryToken,
    useClass: AreaFindOptionsNestQuery
}