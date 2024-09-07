import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { JobPositionEntity } from "../entities/job-position.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class JobPositionRepository extends AbstractRepository<number, JobPositionEntity> {
    constructor(
        @InjectRepository(JobPositionEntity) private readonly repo: Repository<JobPositionEntity>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<JobPositionEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}