import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobPositionExternalKey } from "../entities/job-position-external-key.entity";

@Injectable()
export class JobPositionExternalKeyRepository extends AbstractRepository<number, JobPositionExternalKey> {
    constructor(
        @InjectRepository(JobPositionExternalKey) private readonly repo: Repository<JobPositionExternalKey>
    ) {
        super(repo);
    }
}