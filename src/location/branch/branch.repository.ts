import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { Branch } from "./entities/branch.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BranchRepository extends AbstractRepository<number, Branch>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Branch) private readonly branchModel: Repository<Branch>
    ) {
        super(branchModel);
    }
}