import { Injectable, Provider } from "@nestjs/common";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderUpdateProcessCommandToken } from "../../inject/command.inject";
import { OrderUpdateProcessCommandImpl } from "@omega/medical/application/commands/order/order-update-process.command";

@Injectable()
class OrderUpdateProcessNestCommand extends OrderUpdateProcessCommandImpl {
    constructor(
        @InjectAggregateRepository("Order") repository: OrderRepository
    ) {
        super(repository);
    }
}

export const OrderUpdateProcessCommandProvider: Provider = {
    provide: OrderUpdateProcessCommandToken,
    useClass: OrderUpdateProcessNestCommand
}