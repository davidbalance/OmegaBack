import { Injectable, Provider } from "@nestjs/common";
import { ClientDoctorFindManyQuery } from "@omega/medical/application/queries/client/client-doctor-find-many.query";
import { ClientDoctorRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientDoctorFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientDoctorFindManyNestQuery extends ClientDoctorFindManyQuery {
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