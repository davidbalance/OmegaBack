import { Inject, Injectable, Provider } from "@nestjs/common";
import { CorporativeGroupRepository } from "../repositories/corporative-group.repository";
import { CorporativeGroup } from "../entities/corporative-group.entity";
import { CorporativeGroupExternalKeyService } from "./corporative-group-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostCorporativeGroupRequestDto } from "../dtos/request/post.corporative-group.dto";
import { PatchCorporativeGroupRequestDto } from "../dtos/request/patch.corporative-group.dto";

type RequestType = PostCorporativeGroupRequestDto | PatchCorporativeGroupRequestDto;

@Injectable()
export class CorporativeGroupExternalConnectionService implements IExternalConnectionService<RequestType, CorporativeGroup> {
    constructor(
        @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository,
        @Inject(CorporativeGroupExternalKeyService) private keyService: CorporativeGroupExternalKeyService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<CorporativeGroup> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, data: PostCorporativeGroupRequestDto): Promise<CorporativeGroup> {
        const newKey = await this.keyService.create(key);
        try {
            const group = await this.repository.create({ ...data, externalKey: newKey });
            return group;
        } catch (error) {
            this.keyService.remove(key);
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam, data: PostCorporativeGroupRequestDto): Promise<CorporativeGroup> {
        try {
            const foundGroup = await this.repository.findOne({
                where: [
                    { externalKey: key },
                    { name: data.name }
                ]
            });
            return foundGroup;
        } catch (error) {
            return this.create(key, data);
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam | any, data: PatchCorporativeGroupRequestDto): Promise<CorporativeGroup> {
        const group = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return group;
    }
}

export const INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION = 'CORPORATIVE_GROUP_EXTERNAL_CONNECTION';
export const CorporativeGroupExternalConnectionProvider: Provider = { provide: INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION, useClass: CorporativeGroupExternalKeyService }