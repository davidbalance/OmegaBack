import { Injectable, Provider } from "@nestjs/common";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderCreateFromExternalSourceCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRepository, OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderCreateFromExternalSourceCommand } from "@omega/medical/application/commands/order/order-create-from-external-source.command";

@Injectable()
class OrderCreateFromExternalSourceNestCommand extends OrderCreateFromExternalSourceCommand {
    constructor(
        @InjectModelRepository('OrderExternalConnection') externalConnectionRepository: OrderExternalConnectionRepository,
        @InjectAggregateRepository("Order") aggregateRepository: OrderRepository,
        @InjectModelRepository('Client') clientRepository: ClientRepository
    ) {
        super(
            externalConnectionRepository,
            aggregateRepository,
            clientRepository
        );
    }
}

export const OrderCreateFromExternalSourceCommandProvider: Provider = {
    provide: OrderCreateFromExternalSourceCommandToken,
    useClass: OrderCreateFromExternalSourceNestCommand
}