import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { MedicalReportSendAttribute } from "./entities/medical-report-send-attribute.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MedicalReportSendAttributeRepository extends AbstractRepository<number, MedicalReportSendAttribute> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalReportSendAttribute) private readonly attributeModel: Repository<MedicalReportSendAttribute>
    ) {
        super(attributeModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<MedicalReportSendAttribute>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}