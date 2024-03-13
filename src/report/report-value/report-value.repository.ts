import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { ReportValue } from "./entities/report-value.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ReportValueRepository extends AbstractRepository<number, ReportValue> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ReportValue) private readonly valueModel: Repository<ReportValue>
    ) {
        super(valueModel);
    }
}