import { Injectable, Provider } from "@nestjs/common";
import { UserCreateCommandImpl } from "@omega/profile/application/command/user/user-create.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserCreateCommandToken } from "../inject/command.inject";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { InjectAuth } from "@shared/shared/nest/inject";

@Injectable()
class UserCreateNestCommand extends UserCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository,
        @InjectAuth() auth: AuthProvider
    ) {
        super(repository, auth);
    }
}

export const UserCreateCommandProvider: Provider = {
    provide: UserCreateCommandToken,
    useClass: UserCreateNestCommand
}