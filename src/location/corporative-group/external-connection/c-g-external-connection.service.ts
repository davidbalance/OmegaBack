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

    async create({ source, key, ...data }: CreateCorporativeGroupExternalRequestDTO & { source: string }): Promise<CorporativeGroup> {
        const newKey = await this.keyService.create({ key, source });
        const group = await this.repository.create({ ...data, externalKey: newKey });
        return group;
    }

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