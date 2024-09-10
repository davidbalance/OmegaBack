import { Repository } from "typeorm";
import { LogEntity } from "./entities/log.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

export class LogRepository extends AbstractRepository<number, LogEntity> {

    constructor(
        @InjectRepository(LogEntity) private readonly logModel: Repository<LogEntity>
    ) {
        super(logModel);
    }

}