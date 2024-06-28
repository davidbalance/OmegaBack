import { Inject, Injectable } from "@nestjs/common";
import { CorporativeGroupRepository } from "../corporative-group.repository";
import { CorporativeGroup } from "../entities/corporative-group.entity";
import { ExternalKeyService } from "../external-key/external-key.service";
import { PATCHCorporativeGroupRequestDto, POSTCorporativeGroupRequestDto } from "../dtos/corporative-group.request.dto";

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository,
        @Inject(ExternalKeyService) private keyService: ExternalKeyService
    ) { }

    async create({ source, key, ...data }: POSTCorporativeGroupRequestDto & { source: string }): Promise<CorporativeGroup> {
        const newKey = await this.keyService.create({ key, source });
        const group = await this.repository.create({ ...data, externalKey: newKey });
        return group;
    }

    async findOneOrCreate({ source, key, ...data }: POSTCorporativeGroupRequestDto & { source: string }): Promise<CorporativeGroup> {
        try {
            const foundGroup = await this.repository.findOne({
                where: [{
                    externalKey: {
                        source: source,
                        key: key
                    }
                }, {
                    name: data.name
                }]
            });
            return foundGroup;
        } catch (error) {
            return this.create({ source, key, ...data });
        }
    }

    async findOneAndUpdate({ key, source }: { key: string, source: string }, { ...data }: PATCHCorporativeGroupRequestDto): Promise<CorporativeGroup> {
        const group = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return group;
    }
}