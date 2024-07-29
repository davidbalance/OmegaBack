import { Inject, Injectable, Provider } from "@nestjs/common";
import { Company } from "../entities/company.entity";
import { PATCHCompanyRequestDto, POSTCompanyRequestExternalConnectionDto } from "../dtos/company.request.dto";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { CorporativeGroup } from "@/location/corporative-group/entities/corporative-group.entity";
import { INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION } from "@/location/corporative-group/services/corporative-group-external-connection.service";
import { POSTCorporativeGroupExternalConnectionRequestDto } from "@/location/corporative-group/dtos/post.corporative-group-external-connection.dto";
import { CompanyRepository } from "../repositories/company.repository";
import { CompanyExternalKeyService } from "./company-external-key.service";

type CompanyRequestType = POSTCompanyRequestExternalConnectionDto | PATCHCompanyRequestDto;

@Injectable()
export class CompanyExternalConnectionService implements IExternalConnectionService<CompanyRequestType, Company> {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION) private readonly externalService: IExternalConnectionService<POSTCorporativeGroupExternalConnectionRequestDto, CorporativeGroup>,
        @Inject(CompanyExternalKeyService) private readonly keyService: CompanyExternalKeyService
    ) { }

    async create({ source, key, corporativeGroup, ...company }: POSTCompanyRequestExternalConnectionDto): Promise<Company> {
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

    async findOneOrCreate({ source, key, ...company }: POSTCompanyRequestExternalConnectionDto): Promise<Company> {
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


export const INJECT_COMPANY_EXTERNAL_KEY = 'COMPANY_EXTERNAL_CONNECTION';
export const CompanyExternalConnectionProvider: Provider = { provide: INJECT_COMPANY_EXTERNAL_KEY, useClass: CompanyExternalConnectionService }