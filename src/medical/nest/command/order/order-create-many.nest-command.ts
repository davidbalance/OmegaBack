import { Injectable, Provider } from "@nestjs/common";
import { OrderRepository, TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderCreateManyCommandImpl } from "@omega/medical/application/commands/order/order-create-many.command";
import { OrderCreateManyCommandToken } from "../../inject/command.inject";

@Injectable()
class OrderCreateManyNestCommand extends OrderCreateManyCommandImpl {
    constructor(
        @InjectAggregateRepository("Order") order: OrderRepository,
        @InjectAggregateRepository("Test") test: TestRepository,
        @InjectModelRepository('Client') patient: ClientRepository
    ) {
        super(order, test, patient);
    }
}

export const OrderCreateManyCommandProvider: Provider = {
    provide: OrderCreateManyCommandToken,
    useClass: OrderCreateManyNestCommand
}