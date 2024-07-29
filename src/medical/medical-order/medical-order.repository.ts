import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalOrder } from "./entities/medical-order.entity";

@Injectable()
export class MedicalOrderRepository
    extends AbstractRepository<number, MedicalOrder> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalOrder) private readonly orderModel: Repository<MedicalOrder>
    ) {
        super(orderModel);
    }
}