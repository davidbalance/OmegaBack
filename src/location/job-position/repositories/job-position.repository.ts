import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { JobPosition } from "../entities/job-position.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class JobPositionRepository extends AbstractRepository<number, JobPosition> {
    constructor(
        @InjectRepository(JobPosition) private readonly repo: Repository<JobPosition>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<JobPosition>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}