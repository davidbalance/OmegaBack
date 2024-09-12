import { CityService } from "@/location/city/services/city.service";
import { INJECT_COMPANY_EXTERNAL_KEY } from "@/location/company/services/company-external-connection.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject, Provider } from "@nestjs/common";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchExternalKeyService } from "./branch-external-key.service";
import { PostBranchExternalRequestDto } from "../dtos/request/external-branch.post.dto";
import { ExtendedBranch } from "../dtos/response/extended-branch.base.dto";
import { PostCompanyExternalRequestDto } from "@/location/company/dtos/request/external-company.post.dto";
import { Company } from "@/location/company/dtos/response/company.base.dto";
import { PatchBranchExternalRequestDto } from "../dtos/request/external-branch.patch.dto";

type ConnectionRequestType = PostBranchExternalRequestDto | PatchBranchExternalRequestDto;

@Injectable()
export class BranchExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, ExtendedBranch> {
    constructor(
        @Inject(INJECT_COMPANY_EXTERNAL_KEY) private readonly externalService: IExternalConnectionService<PostCompanyExternalRequestDto, Company>,
        @Inject(BranchRepository) private readonly repository: BranchRepository,
        @Inject(BranchExternalKeyService) private readonly keyService: BranchExternalKeyService,
        @Inject(CityService) private readonly cityService: CityService
    ) { }

    async findOne(key: ExternalKeyParam | any): Promise<ExtendedBranch> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { company, city, ...data }: PostBranchExternalRequestDto): Promise<ExtendedBranch> {
        const { key: companyKey, ...companyData } = company
        const foundCompany = await this.externalService.findOneOrCreate({ ...key, key: companyKey }, companyData);
        const foundCity = await this.cityService.findOneByName(city);
        const newKey = await this.keyService.create(key);
        try {
            const newBranch = await this.repository.create({
                ...data,
                city: foundCity,
                company: foundCompany,
                externalKey: newKey
            });
            return newBranch;
        } catch (error) {
            await this.keyService.remove(key);
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam, body: PostBranchExternalRequestDto): Promise<ExtendedBranch> {
        try {
            const foundBranch = await this.repository.findOne({
                where: { externalKey: key },
                relations: { company: { corporativeGroup: true } }
            });
            return foundBranch;
        } catch (error) {
            return this.create(key, body);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam, body: PatchBranchExternalRequestDto): Promise<ExtendedBranch> {
        const branch = await this.repository.findOneAndUpdate({ externalKey: key }, body);
        return branch;
    }
}

export const INJECT_BRANCH_EXTERNAL_CONNECTION: string = 'INJECT_BRANCH_EXTERNAL_CONNECTION';
export const BranchExternalConnectionProvider: Provider = { provide: INJECT_BRANCH_EXTERNAL_CONNECTION, useClass: BranchExternalConnectionService };