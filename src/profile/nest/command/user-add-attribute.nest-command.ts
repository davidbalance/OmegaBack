import { Injectable, Provider } from "@nestjs/common";
import { UserAddAttributeCommand } from "@omega/profile/application/command/user/user-add-attribute.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { UserAddAttributeCommandToken } from "../inject/command.inject";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";

@Injectable()
class UserAddAttributeNestCommand extends UserAddAttributeCommand {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserAddAttributeCommandProvider: Provider = {
    provide: UserAddAttributeCommandToken,
    useClass: UserAddAttributeNestCommand
}