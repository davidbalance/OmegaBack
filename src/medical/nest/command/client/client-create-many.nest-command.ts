import { Injectable, Provider } from "@nestjs/common";
import { ClientCreateManyCommandToken, InjectCommand } from "../../inject/command.inject";
import { ClientCreateManyCommand } from "@omega/medical/application/commands/client/client-create-many.command";
import { ClientCreateCommand } from "@omega/medical/application/commands/client/client-create.command";

@Injectable()
class ClientCreateManyNestCommand extends ClientCreateManyCommand {
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