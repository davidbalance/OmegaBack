import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { AddCompanyFilterCommandImpl } from "@omega/profile/application/command/user/add-company-filter.command";
import { AddCompanyFilterCommandToken } from "../inject/command.inject";

@Injectable()
class AddCompanyFilterNestCommand extends AddCompanyFilterCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const AddCompanyFilterCommandProvider: Provider = {
    provide: AddCompanyFilterCommandToken,
    useClass: AddCompanyFilterNestCommand
}