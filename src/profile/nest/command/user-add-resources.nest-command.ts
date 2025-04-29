import { Injectable, Provider } from "@nestjs/common";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserAddResourcesCommandToken } from "../inject/command.inject";
import { InjectAuth } from "@shared/shared/nest/inject";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserAddResourcesCommandImpl } from "@omega/profile/application/command/user/user-add-resources.command";

@Injectable()
class UserAddResourcesNestCommand extends UserAddResourcesCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository,
        @InjectAuth() auth: AuthProvider
    ) {
        super(repository, auth);
    }
}

export const UserAddResourcesCommandProvider: Provider = {
    provide: UserAddResourcesCommandToken,
    useClass: UserAddResourcesNestCommand
}