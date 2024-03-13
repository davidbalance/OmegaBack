import { AbstractRepository } from "src/shared";
import { ReportElement } from "./entities/report-element.entity";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class ReportElementRepository extends AbstractRepository<number, ReportElement>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ReportElement) private readonly elementModel: Repository<ReportElement>
    ) {
        super(elementModel);
    }
}