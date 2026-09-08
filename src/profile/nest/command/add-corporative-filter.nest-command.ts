import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { AddCorporativeFilterCommandToken } from "../inject/command.inject";
import { AddCorporativeFilterCommandImpl } from "@omega/profile/application/command/user/add-corporative-filter.command";

@Injectable()
class AddCorporativeFilterNestCommand extends AddCorporativeFilterCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const AddCorporativeFilterCommandProvider: Provider = {
    provide: AddCorporativeFilterCommandToken,
    useClass: AddCorporativeFilterNestCommand
}