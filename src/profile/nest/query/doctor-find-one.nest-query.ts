import { Injectable, Provider } from "@nestjs/common";
import { DoctorFindOneQuery } from "@omega/profile/application/query/user/doctor-find-one.query";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { DoctorFindOneQueryToken } from "../inject/query.inject";

@Injectable()
class DoctorFindOneNestQuery extends DoctorFindOneQuery {
    constructor(
        @InjectModelRepository("Doctor") repository: DoctorRepository
    ) {
        super(repository);
    }
}

export const DoctorFindOneQueryProvider: Provider = {
    provide: DoctorFindOneQueryToken,
    useClass: DoctorFindOneNestQuery
}