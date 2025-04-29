import { Injectable, Provider } from "@nestjs/common";
import { DoctorFindOneByDniQueryImpl } from "@omega/profile/application/query/user/doctor-find-one-by-dni.query";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { DoctorFindOneByDniQueryToken } from "../inject/query.inject";

@Injectable()
class DoctorFindOneByDniNestQuery extends DoctorFindOneByDniQueryImpl {
    constructor(
        @InjectModelRepository("Doctor") repository: DoctorRepository
    ) {
        super(repository);
    }
}

export const DoctorFindOneByDniQueryProvider: Provider = {
    provide: DoctorFindOneByDniQueryToken,
    useClass: DoctorFindOneByDniNestQuery
}