import { Repository } from "typeorm";
import { AbstractRepository } from "../../sql-database";
import { Log } from "./entities/log.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class LogRepository extends AbstractRepository<number, Log> {

    constructor(
        @InjectRepository(Log) private readonly logModel: Repository<Log>
    ) {
        super(logModel);
    }

}