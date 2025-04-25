import { Injectable, Provider } from "@nestjs/common";
import { ClientCreateManyCommandToken, InjectCommand } from "../../inject/command.inject";
import { ClientCreateManyCommandImpl } from "@omega/medical/application/commands/client/client-create-many.command";
import { ClientCreateCommand } from "@omega/medical/application/commands/client/client-create.command";

@Injectable()
class ClientCreateManyNestCommand extends ClientCreateManyCommandImpl {
    constructor(
        @InjectCommand("ClientCreate") command: ClientCreateCommand
    ) {
        super(command);
    }
}

export const ClientCreateManyCommandProvider: Provider = {
    provide: ClientCreateManyCommandToken,
    useClass: ClientCreateManyNestCommand
}