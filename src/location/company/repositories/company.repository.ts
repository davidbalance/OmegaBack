
import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Company } from "../entities/company.entity";

@Injectable()
export class CompanyRepository
    extends AbstractRepository<number, Company> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Company) private readonly companyModel: Repository<Company>
    ) {
        super(companyModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Company>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}