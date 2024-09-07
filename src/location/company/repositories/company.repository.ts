
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CompanyEntity } from "../entities/company.entity";

@Injectable()
export class CompanyRepository
    extends AbstractRepository<number, CompanyEntity> {

    constructor(
        @InjectRepository(CompanyEntity) private readonly companyModel: Repository<CompanyEntity>
    ) {
        super(companyModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<CompanyEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}