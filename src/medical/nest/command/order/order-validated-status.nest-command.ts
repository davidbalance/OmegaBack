import { Injectable, Provider } from "@nestjs/common";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderValidatedStatusCommandToken } from "../../inject/command.inject";
import { OrderValidatedStatusCommandImpl } from "@omega/medical/application/commands/order/order-validated-status.command";

@Injectable()
class OrderValidatedStatusNestCommand extends OrderValidatedStatusCommandImpl {
    constructor(
        @InjectAggregateRepository("Order") repository: OrderRepository
    ) {
        super(repository);
    }
}

export const OrderValidatedStatusCommandProvider: Provider = {
    provide: OrderValidatedStatusCommandToken,
    useClass: OrderValidatedStatusNestCommand
}