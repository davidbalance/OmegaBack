import { Injectable, Provider } from "@nestjs/common";
import { LogoFindManyQueryImpl } from "@omega/auth/application/query/logo/logo-find-many.query";
import { LogoRepository } from "@omega/auth/application/repository/logo/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { LogoFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class LogoFindManyNestQuery extends LogoFindManyQueryImpl {
    constructor(
        @InjectModelRepository('Logo') repository: LogoRepository
    ) {
        super(repository);
    }
}

export const LogoFindManyQueryProvider: Provider = {
    provide: LogoFindManyQueryToken,
    useClass: LogoFindManyNestQuery
}