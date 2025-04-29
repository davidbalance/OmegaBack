import { Injectable, Provider } from "@nestjs/common";
import { UserRemoveAttributeCommandImpl } from "@omega/profile/application/command/user/user-remove-attribute.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { UserRemoveAttributeCommandToken } from "../inject/command.inject";

@Injectable()
class UserRemoveAttributeNestCommand extends UserRemoveAttributeCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserRemoveAttributeCommandProvider: Provider = {
    provide: UserRemoveAttributeCommandToken,
    useClass: UserRemoveAttributeNestCommand
}