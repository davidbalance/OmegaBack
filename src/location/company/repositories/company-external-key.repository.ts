import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyExternalKey } from "../entities/company-external-key.entity";

@Injectable()
export class CompanyExternalKeyRepository extends AbstractRepository<number, CompanyExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(CompanyExternalKey) private readonly keyRepository: Repository<CompanyExternalKey>
    ) {
        super(keyRepository);
    }
}