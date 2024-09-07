import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { BranchEntity } from "../entities/branch.entity";

@Injectable()
export class BranchRepository
    extends AbstractRepository<number, BranchEntity> {

    constructor(
        @InjectRepository(BranchEntity) private readonly branchModel: Repository<BranchEntity>
    ) {
        super(branchModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<BranchEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false })
    }
}