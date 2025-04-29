import { Injectable, Provider } from "@nestjs/common";
import { ClientDoctorFindManyQueryImpl } from "@omega/medical/application/queries/client/client-doctor-find-many.query";
import { ClientDoctorRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientDoctorFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientDoctorFindManyNestQuery extends ClientDoctorFindManyQueryImpl {
    constructor(
        @InjectModelRepository("ClientDoctor") repository: ClientDoctorRepository
    ) {
        super(repository);
    }
}

export const ClientDoctorFindManyQueryProvider: Provider = {
    provide: ClientDoctorFindManyQueryToken,
    useClass: ClientDoctorFindManyNestQuery
}