import { IExternalConnectionService, ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject, Provider } from "@nestjs/common";
import { PATCHJobPositionRequestDto } from "../dtos/patch.job-position.dto";
import { JobPosition } from "../entities/job-position.entity";
import { JobPositionRepository } from "../repositories/job-position.repository";
import { JobPositionExternalKeyService } from "./job-position-external-key.service";
import { POSTJobPositionExternalConnectionRequestDto } from "../dtos/post.job-position-external-connection.dto";

type RequestType = POSTJobPositionExternalConnectionRequestDto | PATCHJobPositionRequestDto;

@Injectable()
export class JobPositionExternalConnectionService implements IExternalConnectionService<RequestType, JobPosition> {
    constructor(
        @Inject(JobPositionRepository) private readonly repository: JobPositionRepository,
        @Inject(JobPositionExternalKeyService) private keyService: JobPositionExternalKeyService
    ) { }

    async create({ source, key, ...data }: POSTJobPositionExternalConnectionRequestDto): Promise<JobPosition> {
        const newKey = await this.keyService.create({ key, source });
        try {
            const group = await this.repository.create({ ...data, externalKey: newKey });
            return group;
        } catch (error) {
            this.keyService.remove({ source, key })
            throw error;
        }
    }

    async findOneOrCreate({ source, key, ...data }: POSTJobPositionExternalConnectionRequestDto): Promise<JobPosition> {
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

    async findOneAndUpdate({ key, source }: ExternalKeyParam, { ...data }: PATCHJobPositionRequestDto): Promise<JobPosition> {
        const group = await this.repository.findOneAndUpdate({
            externalKey: {
                source: source,
                key: key
            }
        }, data);
        return group;
    }
}