import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { RemoveCorporativeFilterCommandToken } from "../inject/command.inject";
import { RemoveCorporativeFilterCommandImpl } from "@omega/profile/application/command/user/remove-corporative-filter.command";

@Injectable()
class RemoveCorporativeFilterNestCommand extends RemoveCorporativeFilterCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const RemoveCorporativeFilterCommandProvider: Provider = {
    provide: RemoveCorporativeFilterCommandToken,
    useClass: RemoveCorporativeFilterNestCommand
}