import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalOrder } from "../entities/medical-order.entity";

@Injectable()
export class MedicalOrderRepository
    extends AbstractRepository<number, MedicalOrder> {

    constructor(
        @InjectRepository(MedicalOrder) private readonly orderModel: Repository<MedicalOrder>
    ) {
        super(orderModel);
    }
}