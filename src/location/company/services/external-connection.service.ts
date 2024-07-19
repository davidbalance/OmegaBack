import { Inject, Injectable } from "@nestjs/common";
import { Company } from "../entities/company.entity";
import { CompanyRepository } from "../company.repository";
import { ExternalKeyService } from "../external-key/external-key.service";
import { PATCHCompanyRequestDto, POSTCompanyRequestDto } from "../dtos/company.request.dto";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { CorporativeGroup } from "@/location/corporative-group/entities/corporative-group.entity";
import { POSTCorporativeGroupExternalConnectionRequestDto } from "@/location/corporative-group/dtos/corporative-group.request.dto";
import { INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION } from "@/location/corporative-group/services/corporative-group-external-connection.service";

type CreateCompanyType = POSTCompanyRequestDto & { source: string };

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION) private readonly externalService: IExternalConnectionService<POSTCorporativeGroupExternalConnectionRequestDto, CorporativeGroup>,
        @Inject(ExternalKeyService) private readonly keyService: ExternalKeyService
    ) { }

    async create({ source, key, corporativeGroup, ...company }: CreateCompanyType): Promise<Company> {
        const group = await this.externalService.findOneOrCreate({
            source: source,
            ...corporativeGroup
        });
        const newKey = await this.keyService.create({ source: source, key: key });
        try {
            const newCompany = await this.repository.create({
                ...company,
                corporativeGroup: group,
                externalKey: newKey
            });
            return newCompany;
        } catch (error) {
            await this.keyService.remove({ key, source });
            throw error;
        }
    }

    async findOneOrCreate({ source, key, ...company }: CreateCompanyType): Promise<Company> {
        try {
            const foundCompany = await this.repository.findOne({
                where: [
                    { externalKey: { source: source, key: key } },
                    { ruc: company.ruc }
                ]
            });
            return foundCompany;
        } catch (error) {
            return this.create({ source, key, ...company });
        }
    }

    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHCompanyRequestDto): Promise<Company> {
        const company = await this.repository.findOneAndUpdate(
            { externalKey: { source: source, key: key } },
            data);
        return company;
    }
}