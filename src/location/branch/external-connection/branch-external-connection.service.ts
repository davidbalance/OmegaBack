import { Inject, Injectable } from "@nestjs/common";
import { BranchExternalKeyService } from "../branch-external-key/branch-external-key.service";
import { BranchRepository } from "../branch.repository";
import { Branch } from "../entities/branch.entity";
import { CompanyExternalConnectionService } from "@/location/company/external-connection/company-external-connection.service";
import { CreateBranchExternalRequestDTO, FindOneBranchExternalAndUpdateRequestDTO } from "../dtos";

@Injectable()
export class BranchExternalConnectionService {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly externalService: CompanyExternalConnectionService,
        @Inject(BranchRepository) private readonly repository: BranchRepository,
        @Inject(BranchExternalKeyService) private readonly keyService: BranchExternalKeyService
    ) { }

    async create({ source, key, company, ...branch }: CreateBranchExternalRequestDTO & { source: string }): Promise<Branch> {
        const foundCompany = await this.externalService.findOneOrCreate({
            source: source,
            ...company
        });
        const newKey = await this.keyService.create({ source: source, key: key });
        const newBranch = await this.repository.create({
            ...branch,
            company: foundCompany,
            externalKey: newKey
        });
        return newBranch;
    }

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