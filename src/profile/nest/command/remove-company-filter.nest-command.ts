import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { RemoveCompanyFilterCommandToken } from "../inject/command.inject";
import { RemoveCompanyFilterCommandImpl } from "@omega/profile/application/command/user/remove-company-filter.command";

@Injectable()
class RemoveCompanyFilterNestCommand extends RemoveCompanyFilterCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const RemoveCompanyFilterCommandProvider: Provider = {
    provide: RemoveCompanyFilterCommandToken,
    useClass: RemoveCompanyFilterNestCommand
}