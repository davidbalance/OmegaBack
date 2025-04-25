import { Injectable, Provider } from "@nestjs/common";
import { UserAddAuthCommandImpl } from "@omega/profile/application/command/user/user-add-auth.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserAddAuthCommandToken } from "../inject/command.inject";
import { InjectAuth } from "@shared/shared/nest/inject";
import { AuthProvider } from "@shared/shared/providers/auth.provider";

@Injectable()
class UserAddAuthNestCommand extends UserAddAuthCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository,
        @InjectAuth() auth: AuthProvider
    ) {
        super(repository, auth);
    }
}

export const UserAddAuthCommandProvider: Provider = {
    provide: UserAddAuthCommandToken,
    useClass: UserAddAuthNestCommand
}