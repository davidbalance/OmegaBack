import { Injectable, Logger } from "@nestjs/common";
import { Branch } from "./entities/branch.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared";

@Injectable()
export class BranchRepository
    extends AbstractRepository<number, Branch>{

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Branch) private readonly branchModel: Repository<Branch>
    ) {
        super(branchModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Branch>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false })
    }
}