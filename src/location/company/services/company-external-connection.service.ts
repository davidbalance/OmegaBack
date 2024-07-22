import { Inject, Injectable, Provider } from "@nestjs/common";
import { Company } from "../entities/company.entity";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { CorporativeGroup } from "@/location/corporative-group/entities/corporative-group.entity";
import { INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION } from "@/location/corporative-group/services/corporative-group-external-connection.service";
import { CompanyRepository } from "../repositories/company.repository";
import { CompanyExternalKeyService } from "./company-external-key.service";
import { PatchCompanyRequestDto } from "../dtos/request/patch.company.request.dto";
import { PostCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/request/post.corporative-group.dto";
import { PostCompanyExternalRequestDto } from "../dtos/request/post.company-external.request.dto";

type ConnectionRequestType = PostCompanyExternalRequestDto | PatchCompanyRequestDto;

@Injectable()
export class CompanyExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, Company> {
    constructor(
        @Inject(CompanyRepository) private readonly repository: CompanyRepository,
        @Inject(INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION) private readonly externalService: IExternalConnectionService<PostCorporativeGroupRequestDto, CorporativeGroup>,
        @Inject(CompanyExternalKeyService) private readonly keyService: CompanyExternalKeyService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<Company> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { corporativeGroup, ...company }: PostCompanyExternalRequestDto): Promise<Company> {
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

    async findOneOrCreate(key: ExternalKeyParam | any, body: PostCompanyExternalRequestDto): Promise<Company> {
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

    async findOneAndUpdate(key: ExternalKeyParam | any, data: PatchCompanyRequestDto): Promise<Company> {
        const company = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return company;
    }
}


export const INJECT_COMPANY_EXTERNAL_KEY = 'COMPANY_EXTERNAL_CONNECTION';
export const CompanyExternalConnectionProvider: Provider = { provide: INJECT_COMPANY_EXTERNAL_KEY, useClass: CompanyExternalConnectionService }