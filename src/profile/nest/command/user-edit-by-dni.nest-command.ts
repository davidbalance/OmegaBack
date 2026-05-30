import { Injectable, Provider } from "@nestjs/common";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserEditByDniCommandToken } from "../inject/command.inject";
import { UserEditByDniCommandImpl } from "@omega/profile/application/command/user/user-edit-by-dni.command";

@Injectable()
class UserEditByDniNestCommand extends UserEditByDniCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserEditByDniCommandProvider: Provider = {
    provide: UserEditByDniCommandToken,
    useClass: UserEditByDniNestCommand
}