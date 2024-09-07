import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { AreaEntity } from "../entities/area.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AreaRepository extends AbstractRepository<number, AreaEntity> {
    protected logger: Logger;

    constructor(
        @InjectRepository(AreaEntity) private readonly repo: Repository<AreaEntity>
    ) {
        super(repo);
    }
}