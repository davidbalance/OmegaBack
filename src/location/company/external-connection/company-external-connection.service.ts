import { Inject, Injectable } from "@nestjs/common";
import { CompanyExternalKeyService } from "../company-external-key/company-external-key.service";
import { CGExternalConnectionService } from "@/location/corporative-group/external-connection/c-g-external-connection.service";
import { CreateCompanyExternalRequestDTO, FindCompanyExternalAndUpdateRequestDTO } from "../dtos/company-external-key.request.dto";
import { Company } from "../entities/company.entity";
import { CompanyRepository } from "../company.repository";

type CreateCompanyType = CreateCompanyExternalRequestDTO & { source: string };

@Injectable()
export class CompanyExternalConnectionService {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(CGExternalConnectionService) private readonly externalService: CGExternalConnectionService,
        @Inject(CompanyExternalKeyService) private readonly keyService: CompanyExternalKeyService
    ) { }

    /**
     * Creates a company by the given options
     * @param param0 
     * @returns Company
     */
    async create({ source, key, corporativeGroup, ...company }: CreateCompanyType): Promise<Company> {
        const group = await this.externalService.findOneOrCreate({
            source: source,
            ...corporativeGroup
        });
        const newKey = await this.keyService.create({ source: source, key: key });
        const newCompany = await this.repository.create({
            ...company,
            corporativeGroup: group,
            externalKey: newKey
        });
        return newCompany;
    }

    /**
     * Finds one company if not exists creates one by the given options
     * @param param0 
     * @returns Company
     */
    async findOneOrCreate({ source, key, ...company }: CreateCompanyType): Promise<Company> {
        try {
            const foundCompany = await this.repository.findOne({
                where: {
                    externalKey: {
                        source: source,
                        key: key
                    }
                }
            });
            return foundCompany;
        } catch (error) {
            return this.create({ source, key, ...company });
        }
    }

    /**
     * Finds one company and updates by the given options
     * @param param0 
     * @param param1 
     * @returns Company
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: FindCompanyExternalAndUpdateRequestDTO): Promise<Company> {
        const company = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return company;
    }
}