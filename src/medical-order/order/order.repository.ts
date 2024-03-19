import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { Order } from "./entities/order.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Result } from "../result/entities/result.entity";

interface OrderRepositoryExtension {
    /**
     * Find one element and append the given results
     * @param filterOptions 
     * @param results 
     */
    findOneAndAppendResult(filterOptions: FindOptionsWhere<Order>, results: Result[]): Promise<Order>;
    /**
     * Find one element and remove the given results 
     * @param filterOptions 
     * @param results 
     */
    findOneAndRemoveResult(filterOptions: FindOptionsWhere<Order>, results: number[]): Promise<Order>;
}

@Injectable()
export class OrderRepository extends AbstractRepository<number, Order> implements OrderRepositoryExtension {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Order) private readonly orderModel: Repository<Order>
    ) {
        super(orderModel);
    }

    async findOneAndAppendResult(filterOptions: FindOptionsWhere<Order>, results: Result[]): Promise<Order> {
        const entity = await this.findOne(filterOptions, { results: true });
        entity.results.concat(results);
        await this.orderModel.save(entity);
        return entity;
    }

    async findOneAndRemoveResult(filterOptions: FindOptionsWhere<Order>, results: number[]): Promise<Order> {
        const entity = await this.findOne(filterOptions, { results: true });
        const newResults = entity.results.filter(e => !results.includes(e.id));
        entity.results = newResults;
        await this.orderModel.save(entity);
        return entity;
    }
}