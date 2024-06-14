import { Inject, Injectable } from "@nestjs/common";
import { ExternalConnectionService as CorporativeGroupService } from "@/location/corporative-group/services/external-connection.service";
import { Company } from "../entities/company.entity";
import { CompanyRepository } from "../company.repository";
import { ExternalKeyService as CorporativeGroupExternalKeyService } from "../external-key/external-key.service";
import { PATCHCompanyRequestDTO, POSTCompanyRequestDTO } from "../dtos/external-key.request.dto";

type CreateCompanyType = POSTCompanyRequestDTO & { source: string };

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(CorporativeGroupService) private readonly externalService: CorporativeGroupService,
        @Inject(CorporativeGroupExternalKeyService) private readonly keyService: CorporativeGroupExternalKeyService
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
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHCompanyRequestDTO): Promise<Company> {
        const company = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return company;
    }
}