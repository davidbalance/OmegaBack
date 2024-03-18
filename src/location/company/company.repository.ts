import { AbstractRepository, RepositoryUpdateStatusExtension } from "src/shared";
import { Company } from "./entities/company.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CompanyRepository
    extends AbstractRepository<number, Company>
    implements RepositoryUpdateStatusExtension<number, Company> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Company) private readonly companyModel: Repository<Company>
    ) {
        super(companyModel);
    }

    async findOneAndUpdateStatus(id: number, status: boolean): Promise<Company> {
        return await this.findOneAndUpdate({ id }, { status });
    }
}