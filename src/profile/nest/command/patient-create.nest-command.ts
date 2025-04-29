import { Injectable, Provider } from "@nestjs/common";
import { PatientCreateCommandImpl } from "@omega/profile/application/command/user/patient-create.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { PatientCreateCommandToken } from "../inject/command.inject";

@Injectable()
class PatientCreateNestCommand extends PatientCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository,
    ) {
        super(repository);
    }
}

export const PatientCreateCommandProvider: Provider = {
    provide: PatientCreateCommandToken,
    useClass: PatientCreateNestCommand
}