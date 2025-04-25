import { Injectable, Provider } from "@nestjs/common";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderRemoveCommandImpl } from "@omega/medical/application/commands/order/order-remove.command";
import { OrderRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class OrderRemoveNestCommand extends OrderRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Order") repository: OrderRepository,
    ) {
        super(repository);
    }
}

export const OrderRemoveCommandProvider: Provider = {
    provide: OrderRemoveCommandToken,
    useClass: OrderRemoveNestCommand
}