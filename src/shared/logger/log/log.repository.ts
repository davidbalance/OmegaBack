import { Repository } from "typeorm";
import { Log } from "./entities/log.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

export class LogRepository extends AbstractRepository<number, Log> {

    constructor(
        @InjectRepository(Log) private readonly logModel: Repository<Log>
    ) {
        super(logModel);
    }

}