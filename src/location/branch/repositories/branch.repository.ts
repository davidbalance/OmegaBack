import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database";
import { Branch } from "../entities/branch.entity";

@Injectable()
export class BranchRepository
    extends AbstractRepository<number, Branch>{

    constructor(
        @InjectRepository(Branch) private readonly branchModel: Repository<Branch>
    ) {
        super(branchModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Branch>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false })
    }
}