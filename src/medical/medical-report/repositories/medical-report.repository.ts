import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalReportEntity } from "../entities/medical-report.entity";

@Injectable()
export class MedicalReportRepository
    extends AbstractRepository<number, MedicalReportEntity> {

    constructor(
        @InjectRepository(MedicalReportEntity) private readonly reportModel: Repository<MedicalReportEntity>
    ) {
        super(reportModel);
    }
}