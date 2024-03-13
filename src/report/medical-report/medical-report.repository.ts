import { AbstractRepository } from "src/shared";
import { MedicalReport } from "./entities/medical-report.entity";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MedicalReportRepository extends AbstractRepository<number, MedicalReport>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalReport) private readonly reportModel: Repository<MedicalReport>
    ) {
        super(reportModel);
    }
}