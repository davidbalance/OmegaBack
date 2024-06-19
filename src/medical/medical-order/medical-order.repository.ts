import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<MedicalOrder>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}