
import { AbstractRepository } from "@/shared";
import { Company } from "./entities/company.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

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