import { Injectable, Provider } from "@nestjs/common";
import { UserRemoveCommand } from "@omega/profile/application/command/user/user-remove.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserRemoveCommandToken } from "../inject/command.inject";

@Injectable()
class UserRemoveNestCommand extends UserRemoveCommand {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserRemoveCommandProvider: Provider = {
    provide: UserRemoveCommandToken,
    useClass: UserRemoveNestCommand
}