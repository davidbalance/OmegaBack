import { Injectable, Provider } from "@nestjs/common";
import { OrderCreateCommand } from "@omega/medical/application/commands/order/order-create.command";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderCreateCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class OrderCreateNestCommand extends OrderCreateCommand {
    constructor(
        @InjectAggregateRepository("Order") repository: OrderRepository,
        @InjectModelRepository('Client') user: ClientRepository
    ) {
        super(repository, user);
    }
}

export const OrderCreateCommandProvider: Provider = {
    provide: OrderCreateCommandToken,
    useClass: OrderCreateNestCommand
}