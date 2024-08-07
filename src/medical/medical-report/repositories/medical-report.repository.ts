import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalReport } from "../entities/medical-report.entity";

@Injectable()
export class MedicalReportRepository
    extends AbstractRepository<number, MedicalReport> {

    constructor(
        @InjectRepository(MedicalReport) private readonly reportModel: Repository<MedicalReport>
    ) {
        super(reportModel);
    }
}