import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { OrderExternalKey } from "./entities/order-external-key.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrderExternalKeyRepository extends AbstractRepository<number, OrderExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(OrderExternalKey) private readonly keyModel: Repository<OrderExternalKey>
    ) {
        super(keyModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<OrderExternalKey>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}