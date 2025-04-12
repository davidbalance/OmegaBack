import { CityService } from "@/location/city/services/city.service";
import { Company } from "@/location/company/entities/company.entity";
import { INJECT_COMPANY_EXTERNAL_KEY } from "@/location/company/services/company-external-connection.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject, Provider } from "@nestjs/common";
import { Branch } from "../entities/branch.entity";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchExternalKeyService } from "./branch-external-key.service";
import { PatchBranchRequestDto } from "../dtos/request/patch.branch.request.dto";
import { PostBranchExternalRequestDto } from "../dtos/request/post.branch-external.request.dto";
import { PostCompanyExternalRequestDto } from "@/location/company/dtos/request/post.company-external.request.dto";

type ConnectionRequestType = PostBranchExternalRequestDto | PatchBranchRequestDto;

@Injectable()
export class BranchExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, Branch> {
    constructor(
        @Inject(INJECT_COMPANY_EXTERNAL_KEY) private readonly externalService: IExternalConnectionService<PostCompanyExternalRequestDto, Company>,
        @Inject(BranchRepository) private readonly repository: BranchRepository,
        @Inject(BranchExternalKeyService) private readonly keyService: BranchExternalKeyService,
        @Inject(CityService) private readonly cityService: CityService
    ) { }

    async findOne(key: ExternalKeyParam | any): Promise<Branch> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, { company, city, ...data }: PostBranchExternalRequestDto): Promise<Branch> {
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

    async findOneOrCreate(key: ExternalKeyParam, body: PostBranchExternalRequestDto): Promise<Branch> {
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

    async findOneAndUpdate(key: ExternalKeyParam, body: PatchBranchRequestDto): Promise<Branch> {
        const branch = await this.repository.findOneAndUpdate({ externalKey: key }, body);
        return branch;
    }
}

export const INJECT_BRANCH_EXTERNAL_CONNECTION: string = 'INJECT_BRANCH_EXTERNAL_CONNECTION';
export const BranchExternalConnectionProvider: Provider = { provide: INJECT_BRANCH_EXTERNAL_CONNECTION, useClass: BranchExternalConnectionService };