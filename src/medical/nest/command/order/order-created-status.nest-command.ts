import { Injectable, Provider } from "@nestjs/common";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderCreatedStatusCommandToken } from "../../inject/command.inject";
import { OrderCreatedStatusCommandImpl } from "@omega/medical/application/commands/order/order-created-status.command";

@Injectable()
class OrderCreatedStatusNestCommand extends OrderCreatedStatusCommandImpl {
    constructor(
        @InjectAggregateRepository("Order") repository: OrderRepository
    ) {
        super(repository);
    }
}

export const OrderCreatedStatusCommandProvider: Provider = {
    provide: OrderCreatedStatusCommandToken,
    useClass: OrderCreatedStatusNestCommand
}