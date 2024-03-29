import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderRepository
    extends AbstractRepository<number, Order> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Order) private readonly orderModel: Repository<Order>
    ) {
        super(orderModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<Order>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}