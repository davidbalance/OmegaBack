import { Inject, Injectable } from "@nestjs/common";
import { BranchRepository } from "../branch.repository";
import { Branch } from "../entities/branch.entity";
import { ExternalConnectionService as CompanyExternalConnectionService } from "@/location/company/services/external-connection.service";
import { CityService } from "@/location/city/services/city.service";
import { ExternalKeyService } from "../external-key/external-key.service";
import { PATCHBranchRequestDto, POSTBranchRequestDto } from "../dtos/branch.request.dto";

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(CompanyExternalConnectionService) private readonly externalService: CompanyExternalConnectionService,
        @Inject(BranchRepository) private readonly repository: BranchRepository,
        @Inject(ExternalKeyService) private readonly keyService: ExternalKeyService,
        @Inject(CityService) private readonly cityService: CityService
    ) { }

    async create({ source, key, company, city, ...branch }: POSTBranchRequestDto & { source: string }): Promise<Branch> {
        const foundCompany = await this.externalService.findOneOrCreate({
            source: source,
            ...company
        });
        const foundCity = await this.cityService.findOneByName(city);
        const newKey = await this.keyService.create({ source: source, key: key });
        const newBranch = await this.repository.create({
            ...branch,
            city: foundCity,
            company: foundCompany,
            externalKey: newKey
        });
        return newBranch;
    }

    async findOneOrCreate({ source, key, ...branch }: POSTBranchRequestDto & { source: string }): Promise<Branch> {
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

    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHBranchRequestDto): Promise<Branch> {
        const branch = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return branch;
    }
}