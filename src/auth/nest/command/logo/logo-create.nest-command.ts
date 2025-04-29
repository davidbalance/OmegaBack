import { Injectable, Provider } from "@nestjs/common";
import { LogoCreateCommandImpl } from "@omega/auth/application/command/logo/logo-create.command";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { LogoCreateCommandToken } from "../../inject/command.inject";
import { LogoRepository } from "@omega/auth/application/repository/logo/aggregate.repositories";

@Injectable()
class LogoCreateNestCommand extends LogoCreateCommandImpl {
    constructor(
        @InjectAggregateRepository('Logo') repository: LogoRepository
    ) {
        super(repository);
    }
}

export const LogoCreateCommandProvider: Provider = {
    provide: LogoCreateCommandToken,
    useClass: LogoCreateNestCommand
}