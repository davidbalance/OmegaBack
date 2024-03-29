import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { MedicalReportValue } from "./entities/medical-report-value.entity";

@Injectable()
export class MedicalReportValueRepository
    extends AbstractRepository<number, MedicalReportValue> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalReportValue) private readonly valueModel: Repository<MedicalReportValue>
    ) {
        super(valueModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<MedicalReportValue>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}