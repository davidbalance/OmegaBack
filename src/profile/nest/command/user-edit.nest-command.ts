import { Injectable, Provider } from "@nestjs/common";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserEditCommandToken } from "../inject/command.inject";
import { UserEditCommandImpl } from "@omega/profile/application/command/user/user-edit.command";

@Injectable()
class UserEditNestCommand extends UserEditCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserEditCommandProvider: Provider = {
    provide: UserEditCommandToken,
    useClass: UserEditNestCommand
}