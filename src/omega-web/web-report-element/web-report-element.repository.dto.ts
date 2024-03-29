import { AbstractRepository } from "@/shared";
import { WebReportElement } from "./entities/web-report-element.entity";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class WebReportElementRepository
    extends AbstractRepository<number, WebReportElement> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebReportElement) private readonly elementModel: Repository<WebReportElement>
    ) {
        super(elementModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<WebReportElement>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}