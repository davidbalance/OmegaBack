import { Inject, Injectable, Provider } from "@nestjs/common";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION } from "@/location/corporative-group/services/corporative-group-external-connection.service";
import { CompanyRepository } from "../repositories/company.repository";
import { CompanyExternalKeyService } from "./company-external-key.service";
import { PostCompanyExternalRequestDto } from "../dtos/request/external-company.post.dto";
import { ExtendedCompany } from "../dtos/response/extended-company.base.dto";
import { CorporativeGroup } from "@/location/corporative-group/dtos/response/corporative-group.base.dto";
import { PatchCompanyExternalRequestDto } from "../dtos/request/external-company.patch.dto";
import { ExternalCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/request/external-corporative-group.base.dto";

type ConnectionRequestType = PostCompanyExternalRequestDto | PatchCompanyExternalRequestDto;

@Injectable()
export class CompanyExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExtendedCompany> {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION) private readonly externalService: IExternalConnectionService<ExternalCorporativeGroupRequestDto, CorporativeGroup>,
        @Inject(CompanyExternalKeyService) private readonly keyService: CompanyExternalKeyService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<ExtendedCompany> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { corporativeGroup, ...company }: PostCompanyExternalRequestDto): Promise<ExtendedCompany> {
        const { key: corporativeGroupKey, ...corporativeGroupData } = corporativeGroup;
        const group = await this.externalService.findOneOrCreate({ ...key, key: corporativeGroupKey }, corporativeGroupData);
        const newKey = await this.keyService.create(key);
        try {
            const newCompany = await this.repository.create({
                ...company,
                corporativeGroup: group,
                externalKey: newKey
            });
            return newCompany;
        } catch (error) {
            await this.keyService.remove(key);
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam | any, body: PostCompanyExternalRequestDto): Promise<ExtendedCompany> {
        try {
            const foundCompany = await this.repository.findOne({
                where: [
                    { externalKey: key },
                    { ruc: body.ruc }
                ]
            });
            return foundCompany;
        } catch (error) {
            return this.create(key, body);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam | any, data: PatchCompanyExternalRequestDto): Promise<ExtendedCompany> {
        const company = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return company;
    }
}

export const INJECT_COMPANY_EXTERNAL_KEY = 'COMPANY_EXTERNAL_CONNECTION';
export const CompanyExternalConnectionProvider: Provider = { provide: INJECT_COMPANY_EXTERNAL_KEY, useClass: CompanyExternalConnectionService }