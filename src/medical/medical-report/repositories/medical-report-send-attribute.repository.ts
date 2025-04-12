import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { MedicalReportSendAttribute } from "../entities/medical-report-send-attribute.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MedicalReportSendAttributeRepository extends AbstractRepository<number, MedicalReportSendAttribute> {

    constructor(
        @InjectRepository(MedicalReportSendAttribute) private readonly attributeModel: Repository<MedicalReportSendAttribute>
    ) {
        super(attributeModel);
    }
}