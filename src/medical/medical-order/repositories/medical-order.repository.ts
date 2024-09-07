import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalOrderEntity } from "../entities/medical-order.entity";

@Injectable()
export class MedicalOrderRepository
    extends AbstractRepository<number, MedicalOrderEntity> {

    constructor(
        @InjectRepository(MedicalOrderEntity) private readonly orderModel: Repository<MedicalOrderEntity>
    ) {
        super(orderModel);
    }
}