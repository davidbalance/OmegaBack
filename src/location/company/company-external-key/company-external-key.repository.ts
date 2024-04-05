import { AbstractRepository } from "@/shared";
import { CompanyExternalKey } from "./entities/company-external-key.entity";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CompanyExternalKeyRepository extends AbstractRepository<number, CompanyExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(CompanyExternalKey) private readonly companyModel: Repository<CompanyExternalKey>
    ) {
        super(companyModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<CompanyExternalKey>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}