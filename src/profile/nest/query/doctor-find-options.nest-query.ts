import { Injectable, Provider } from "@nestjs/common";
import { DoctorOptionRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { DoctorFindOptionsQuery } from "@omega/profile/application/query/user/doctor-find-options.query";
import { DoctorFindOptionsQueryToken } from "../inject/query.inject";

@Injectable()
class DoctorFindOptionNestQuery extends DoctorFindOptionsQuery {
    constructor(
        @InjectModelRepository("DoctorOption") repository: DoctorOptionRepository
    ) {
        super(repository);
    }
}

export const DoctorFindOptionsQueryProvider: Provider = {
    provide: DoctorFindOptionsQueryToken,
    useClass: DoctorFindOptionNestQuery
}