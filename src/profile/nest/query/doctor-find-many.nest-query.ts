import { Injectable, Provider } from "@nestjs/common";
import { DoctorFindManyQueryImpl } from "@omega/profile/application/query/user/doctor-find-many.query";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { DoctorFindManyQueryToken } from "../inject/query.inject";

@Injectable()
class DoctorFindManyNestQuery extends DoctorFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Doctor") repository: DoctorRepository
    ) {
        super(repository);
    }
}

export const DoctorFindManyQueryProvider: Provider = {
    provide: DoctorFindManyQueryToken,
    useClass: DoctorFindManyNestQuery
}