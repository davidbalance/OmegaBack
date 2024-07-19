import { CityService } from "@/location/city/services/city.service";
import { POSTCompanyRequestExternalConnectionDto } from "@/location/company/dtos/company.request.dto";
import { Company } from "@/location/company/entities/company.entity";
import { INJECT_COMPANY_EXTERNAL_KEY } from "@/location/company/services/company-external-connection.service";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject, Provider } from "@nestjs/common";
import { Branch } from "../entities/branch.entity";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchExternalKeyService } from "./branch-external-key.service";
import { PATCHBranchRequestDto } from "../dtos/patch.branch.dto";
import { POSTBranchExternalConnectionRequestDto } from "../dtos/post.branch.dto";

type RequestType = POSTBranchExternalConnectionRequestDto | PATCHBranchRequestDto;

@Injectable()
export class BranchExternalConnectionService implements IExternalConnectionService<RequestType, Branch> {
    constructor(
        @Inject(INJECT_COMPANY_EXTERNAL_KEY) private readonly externalService: IExternalConnectionService<POSTCompanyRequestExternalConnectionDto, Company>,
        @Inject(BranchRepository) private readonly repository: BranchRepository,
        @Inject(BranchExternalKeyService) private readonly keyService: BranchExternalKeyService,
        @Inject(CityService) private readonly cityService: CityService
    ) { }

    async create({ source, key, company, city, ...branch }: POSTBranchExternalConnectionRequestDto): Promise<Branch> {
        const foundCompany = await this.externalService.findOneOrCreate({
            source: source,
            ...company
        });
        const foundCity = await this.cityService.findOneByName(city);
        const newKey = await this.keyService.create({ source: source, key: key });
        try {
            const newBranch = await this.repository.create({
                ...branch,
                city: foundCity,
                company: foundCompany,
                externalKey: newKey
            });
            return newBranch;
        } catch (error) {
            await this.keyService.remove({ source, key });
            throw error;
        }
    }

    async findOneOrCreate({ source, key, ...branch }: POSTBranchExternalConnectionRequestDto): Promise<Branch> {
        try {
            const foundBranch = await this.repository.findOne({
                where: {
                    externalKey: { source: source, key: key }
                },
                relations: { company: { corporativeGroup: true } }
            });
            return foundBranch;
        } catch (error) {
            return this.create({ source, key, ...branch });
        }
    }

    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHBranchRequestDto): Promise<Branch> {
        const branch = await this.repository.findOneAndUpdate({
            externalKey: { source: source, key: key }
        }, data);
        return branch;
    }
}

export const INJECT_BRANCH_EXTERNAL_CONNECTION: string = 'INJECT_BRANCH_EXTERNAL_CONNECTION';
export const BranchExternalConnectionProvider: Provider = { provide: INJECT_BRANCH_EXTERNAL_CONNECTION, useClass: BranchExternalConnectionService };