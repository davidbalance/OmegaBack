import { AbstractRepository } from "@/shared";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ResultSendAttribute } from "./entities/result-send-attribute.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ResultSendAttributeRepository extends AbstractRepository<number, ResultSendAttribute> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ResultSendAttribute) private readonly attributeModel: Repository<ResultSendAttribute>
    ) {
        super(attributeModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<ResultSendAttribute>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}