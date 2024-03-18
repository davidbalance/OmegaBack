import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository, RepositoryUpdateStatusExtension } from "src/shared";
import { Branch } from "./entities/branch.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BranchRepository
    extends AbstractRepository<number, Branch>
    implements RepositoryUpdateStatusExtension<number, Branch>
{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Branch) private readonly branchModel: Repository<Branch>
    ) {
        super(branchModel);
    }

    async findOneAndUpdateStatus(id: number, status: boolean): Promise<Branch> {
        return await this.findOneAndUpdate({ id }, { status });
    }
}