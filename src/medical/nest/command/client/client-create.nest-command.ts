import { Injectable, Provider } from "@nestjs/common";
import { ClientCreateCommand, ClientCreateCommandPayload } from "@omega/medical/application/commands/client/client-create.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientCreateCommandToken } from "../../inject/command.inject";
import { InjectNotify } from "../../inject/notify.inject";
import { NotificationProvider } from "@shared/shared/providers/notification.provider";

@Injectable()
class ClientCreateNestCommand extends ClientCreateCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository,
        @InjectNotify('PatientCreate') userNotify: NotificationProvider<ClientCreateCommandPayload>
    ) {
        super(repository, userNotify);
    }
}

export const ClientCreateCommandProvider: Provider = {
    provide: ClientCreateCommandToken,
    useClass: ClientCreateNestCommand
}