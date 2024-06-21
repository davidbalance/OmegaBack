import { Inject, Injectable } from "@nestjs/common";
import { ExternalConnectionService as CorporativeGroupService } from "@/location/corporative-group/services/external-connection.service";
import { Company } from "../entities/company.entity";
import { CompanyRepository } from "../company.repository";
import { ExternalKeyService } from "../external-key/external-key.service";
import { PATCHCompanyRequestDto, POSTCompanyRequestDto } from "../dtos/company.request.dto";

type CreateCompanyType = POSTCompanyRequestDto & { source: string };

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(CorporativeGroupService) private readonly externalService: CorporativeGroupService,
        @Inject(ExternalKeyService) private readonly keyService: ExternalKeyService
    ) { }

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

    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHCompanyRequestDto): Promise<Company> {
        const company = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return company;
    }
}