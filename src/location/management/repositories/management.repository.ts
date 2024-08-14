import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Management } from "../entities/management.entity";

@Injectable()
export class ManagementRepository extends AbstractRepository<number, Management> {
    protected logger: Logger;

    constructor(
        @InjectRepository(Management) private readonly repo: Repository<Management>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Management>): Promise<void> {
        await this.repo.delete(filterOptions);
    }
}