import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobPositionExternalKeyEntity } from "../entities/job-position-external-key.entity";

@Injectable()
export class JobPositionExternalKeyRepository extends AbstractRepository<number, JobPositionExternalKeyEntity> {
    constructor(
        @InjectRepository(JobPositionExternalKeyEntity) private readonly repo: Repository<JobPositionExternalKeyEntity>
    ) {
        super(repo);
    }
}