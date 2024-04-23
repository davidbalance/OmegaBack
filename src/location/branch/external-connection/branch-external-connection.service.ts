import { Inject, Injectable } from "@nestjs/common";
import { BranchExternalKeyService } from "../branch-external-key/branch-external-key.service";
import { BranchRepository } from "../branch.repository";
import { Branch } from "../entities/branch.entity";
import { CompanyExternalConnectionService } from "@/location/company/external-connection/company-external-connection.service";
import { CreateBranchExternalRequestDTO, FindOneBranchExternalAndUpdateRequestDTO } from "../dtos";
import { CityService } from "@/location/city/city.service";

@Injectable()
export class BranchExternalConnectionService {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly externalService: CompanyExternalConnectionService,
        @Inject(BranchRepository) private readonly repository: BranchRepository,
        @Inject(BranchExternalKeyService) private readonly keyService: BranchExternalKeyService,
        @Inject(CityService) private readonly cityService: CityService
    ) { }

    /**
     * Creates a branch with the given options
     * @param param0 
     * @returns Branch
     */
    async create({ source, key, company, city, ...branch }: CreateBranchExternalRequestDTO & { source: string }): Promise<Branch> {
        const foundCompany = await this.externalService.findOneOrCreate({
            source: source,
            ...company
        });
        const foundCity = await this.cityService.findOne(city);
        const newKey = await this.keyService.create({ source: source, key: key });
        const newBranch = await this.repository.create({
            ...branch,
            city: foundCity,
            company: foundCompany,
            externalKey: newKey
        });
        return newBranch;
    }

    /**
     * Find one branch if not exists creates a new branch with the given options
     * @param param0 
     * @returns Branch
     */
    async findOneOrCreate({ source, key, ...branch }: CreateBranchExternalRequestDTO & { source: string }): Promise<Branch> {
        try {
            const foundBranch = await this.repository.findOne({
                where: {
                    externalKey: {
                        source: source,
                        key: key
                    }
                },
                relations: {
                    company: {
                        corporativeGroup: true
                    }
                }
            });
            return foundBranch;
        } catch (error) {
            return this.create({ source, key, ...branch });
        }
    }

    /**
     * Find one branch and updates with the given values
     * @param param0 
     * @param param1 
     * @returns Branch
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: FindOneBranchExternalAndUpdateRequestDTO): Promise<Branch> {
        const branch = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return branch;
    }
}