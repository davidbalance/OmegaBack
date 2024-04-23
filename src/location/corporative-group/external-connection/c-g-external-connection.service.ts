import { Inject, Injectable } from "@nestjs/common";
import { CorporativeGroupRepository } from "../corporative-group.repository";
import { CorporativeGroup } from "../entities/corporative-group.entity";
import { CreateCorporativeGroupExternalRequestDTO, FindCorporativeGroupAndUpdateRequestDTO } from "../dtos/c-g-external-connection.request.dto";
import { CorporativeGroupExternalKeyService } from "../corporative-group-external-key/corporative-group-external-key.service";

@Injectable()
export class CGExternalConnectionService {
    constructor(
        @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository,
        @Inject(CorporativeGroupExternalKeyService) private keyService: CorporativeGroupExternalKeyService
    ) { }

    /**
     * Creates a corporative group with the given options
     * @param param0 
     * @returns CorporativeGroup
     */
    async create({ source, key, ...data }: CreateCorporativeGroupExternalRequestDTO & { source: string }): Promise<CorporativeGroup> {
        const newKey = await this.keyService.create({ key, source });
        const group = await this.repository.create({ ...data, externalKey: newKey });
        return group;
    }

    /**
     * Find one corporative group if not exists creates a new one with the given options
     * @param param0 
     * @returns CorporativeGroup
     */
    async findOneOrCreate({ source, key, ...data }: CreateCorporativeGroupExternalRequestDTO & { source: string }): Promise<CorporativeGroup> {
        try {
            const foundGroup = await this.repository.findOne({
                where: {
                    externalKey: {
                        source: source,
                        key: key
                    }
                }
            });
            return foundGroup;
        } catch (error) {
            return this.create({ source, key, ...data });
        }
    }

    /**
     * Find one corporative group and updates it with the given values
     * @param param0 
     * @param param1 
     * @returns CorporativeGroup
     */
    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: FindCorporativeGroupAndUpdateRequestDTO): Promise<CorporativeGroup> {
        const group = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return group;
    }
}