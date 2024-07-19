import { Inject, Injectable, Provider } from "@nestjs/common";
import { CorporativeGroupRepository } from "../repositories/corporative-group.repository";
import { CorporativeGroup } from "../entities/corporative-group.entity";
import { PATCHCorporativeGroupRequestDto, POSTCorporativeGroupExternalKeyRequestDto, POSTCorporativeGroupRequestDto } from "../dtos/corporative-group.request.dto";
import { CorporativeGroupExternalKeyService } from "./corporative-group-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";

type RequestType = POSTCorporativeGroupExternalKeyRequestDto | PATCHCorporativeGroupRequestDto;

@Injectable()
export class CorporativeGroupExternalConnectionService implements IExternalConnectionService<RequestType, CorporativeGroup> {
    constructor(
        @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository,
        @Inject(CorporativeGroupExternalKeyService) private keyService: CorporativeGroupExternalKeyService
    ) { }

    async create({ source, key, ...data }: POSTCorporativeGroupExternalKeyRequestDto): Promise<CorporativeGroup> {
        const newKey = await this.keyService.create({ key, source });
        try {
            const group = await this.repository.create({ ...data, externalKey: newKey });
            return group;
        } catch (error) {
            this.keyService.remove({ source, key })
            throw error;
        }
    }

    async findOneOrCreate({ source, key, ...data }: POSTCorporativeGroupExternalKeyRequestDto): Promise<CorporativeGroup> {
        try {
            const foundGroup = await this.repository.findOne({
                where: [{
                    externalKey: { source: source, key: key }
                }, {
                    name: data.name
                }]
            });
            return foundGroup;
        } catch (error) {
            return this.create({ source, key, ...data });
        }
    }

    async findOneAndUpdate({ key, source }: ExternalKeyParam, { ...data }: PATCHCorporativeGroupRequestDto): Promise<CorporativeGroup> {
        const group = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return group;
    }
}



export const INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION = 'CORPORATIVE_GROUP_EXTERNAL_CONNECTION';
export const CorporativeGroupExternalConnectionProvider: Provider = { provide: INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION, useClass: CorporativeGroupExternalKeyService }