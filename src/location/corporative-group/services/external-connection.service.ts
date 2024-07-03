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

    /**
     * Crea un grupo corporativo.
     * @param param0 
     * @returns 
     */
    async create({ source, key, ...data }: POSTCorporativeGroupRequestDto & { source: string }): Promise<CorporativeGroup> {
        const newKey = await this.keyService.create({ key, source });
        try {
            const group = await this.repository.create({ ...data, externalKey: newKey });
            return group;
        } catch (error) {
            this.keyService.remove({ source, key })
            throw error;
        }
    }

    /**
     * Encuentra un grupo corporativo si no existe lo crea.
     * @param param0 
     * @returns 
     */
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

    /**
     * Encuentra un grupo corporativo y lo modifica.
     * @param param0 
     * @param param1 
     * @returns 
     */
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