import { Inject, Injectable, Provider } from "@nestjs/common";
import { CorporativeGroupRepository } from "../repositories/corporative-group.repository";
import { CorporativeGroupExternalKeyService } from "./corporative-group-external-key.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { ExtendedCorporativeGroup } from "../dtos/response/extended-corporative-group.base.dto";
import { PostExternalCorporativeGroupRequestDto } from "../dtos/request/external-corporative-group.post.dto";
import { PatchExternalCorporativeGroupRequestDto } from "../dtos/request/external-corporative-group.patch.dto";

type RequestType = PostExternalCorporativeGroupRequestDto | PatchExternalCorporativeGroupRequestDto;

@Injectable()
export class CorporativeGroupExternalConnectionService implements IExternalConnectionService<RequestType, ExtendedCorporativeGroup> {
    constructor(
        @Inject(CorporativeGroupRepository) private readonly repository: CorporativeGroupRepository,
        @Inject(CorporativeGroupExternalKeyService) private keyService: CorporativeGroupExternalKeyService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<ExtendedCorporativeGroup> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, data: PostExternalCorporativeGroupRequestDto): Promise<ExtendedCorporativeGroup> {
        const newKey = await this.keyService.create(key);
        try {
            const group = await this.repository.create({ ...data, externalKey: newKey });
            return group;
        } catch (error) {
            this.keyService.remove(key);
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam, data: PostExternalCorporativeGroupRequestDto): Promise<ExtendedCorporativeGroup> {
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

    async findOneAndUpdate(key: ExternalKeyParam | any, data: PatchExternalCorporativeGroupRequestDto): Promise<ExtendedCorporativeGroup> {
        const group = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return group;
    }
}

export const INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION = 'CORPORATIVE_GROUP_EXTERNAL_CONNECTION';
export const CorporativeGroupExternalConnectionProvider: Provider = { provide: INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION, useClass: CorporativeGroupExternalConnectionService }
