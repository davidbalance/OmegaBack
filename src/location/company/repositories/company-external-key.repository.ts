import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyExternalKey } from "../entities/company-external-key.entity";

@Injectable()
export class CompanyExternalKeyRepository extends AbstractRepository<number, CompanyExternalKey> {

    constructor(
        @InjectRepository(CompanyExternalKey) private readonly keyRepository: Repository<CompanyExternalKey>
    ) {
        super(keyRepository);
    }
}