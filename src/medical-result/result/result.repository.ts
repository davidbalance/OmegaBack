import { AbstractRepository } from "src/shared";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Result } from "./entities/result.entity";

@Injectable()
export class ResultRepository
    extends AbstractRepository<number, Result>{

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Result) private readonly resultModel: Repository<Result>
    ) {
        super(resultModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<Result>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}