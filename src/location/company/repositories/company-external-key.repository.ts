import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyExternalKeyEntity } from "../entities/company-external-key.entity";

@Injectable()
export class CompanyExternalKeyRepository extends AbstractRepository<number, CompanyExternalKeyEntity> {

    constructor(
        @InjectRepository(CompanyExternalKeyEntity) private readonly keyRepository: Repository<CompanyExternalKeyEntity>
    ) {
        super(keyRepository);
    }
}