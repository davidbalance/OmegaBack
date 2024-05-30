import { Inject, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "../../sql-database";
import { Log } from "./entities/log.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class LogRepository extends AbstractRepository<number, Log> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Log) private readonly logModel: Repository<Log>
    ) {
        super(logModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<Log>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

}