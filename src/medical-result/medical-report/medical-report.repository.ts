import { AbstractRepository } from "src/shared";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalReport } from "./entities/medical-report.entity";

@Injectable()
export class MedicalReportRepository
    extends AbstractRepository<number, MedicalReport>{

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalReport) private readonly reportModel: Repository<MedicalReport>
    ) {
        super(reportModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<MedicalReport>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}