import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { DoctorCreateCommand } from "@omega/profile/application/command/user/doctor-create.command";
import { DoctorCreateCommandToken } from "../inject/command.inject";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

@Injectable()
class DoctorCreateNestCommand extends DoctorCreateCommand {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const DoctorCreateCommandProvider: Provider = {
    provide: DoctorCreateCommandToken,
    useClass: DoctorCreateNestCommand
}