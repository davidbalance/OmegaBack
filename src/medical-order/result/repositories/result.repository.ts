import { AbstractRepository } from "src/shared";
import { Result } from "../entities/result.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ResultRepository extends AbstractRepository<number, Result>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Result) private readonly resultModel: Repository<Result>
    ) {
        super(resultModel);
    }
}