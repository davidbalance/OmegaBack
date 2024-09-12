import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ManagementEntity } from "../entities/management.entity";

@Injectable()
export class ManagementRepository extends AbstractRepository<number, ManagementEntity> {
    protected logger: Logger;

    constructor(
        @InjectRepository(ManagementEntity) private readonly repo: Repository<ManagementEntity>
    ) {
        super(repo);
    }
}