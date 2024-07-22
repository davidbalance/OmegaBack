import { IExternalConnectionService, ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject, Provider } from "@nestjs/common";
import { PostJobPositionRequestDto } from "../dtos/request/post.job-position.request.dto";
import { PatchJobPositionRequestDto } from "../dtos/request/patch.job-position.request.dto";
import { JobPosition } from "../entities/job-position.entity";
import { JobPositionRepository } from "../repositories/job-position.repository";
import { JobPositionExternalKeyService } from "./job-position-external-key.service";

type ConnectionRequestType = PostJobPositionRequestDto | PatchJobPositionRequestDto;

@Injectable()
export class JobPositionExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, JobPosition> {
    constructor(
        @Inject(JobPositionRepository) private readonly repository: JobPositionRepository,
        @Inject(JobPositionExternalKeyService) private keyService: JobPositionExternalKeyService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<JobPosition> {
        throw new Error("Method not implemented.");
    }

    async create({ key, source }: ExternalKeyParam, body: ConnectionRequestType): Promise<JobPosition> {
        const newKey = await this.keyService.create({ key, source });
        try {
            const group = await this.repository.create({ ...body, externalKey: newKey });
            return group;
        } catch (error) {
            this.keyService.remove({ source, key })
            throw error;
        }
    }

    async findOneOrCreate({ key, source }: ExternalKeyParam, { name, ...data }: ConnectionRequestType): Promise<JobPosition> {
        try {
            const foundGroup = await this.repository.findOne({
                where: [
                    { externalKey: { source: source, key: key } },
                    { name: name }
                ]
            });
            return foundGroup;
        } catch (error) {
            return this.create({ source, key }, { name, ...data });
        }
    }

    async findOneAndUpdate({ key, source }: ExternalKeyParam, { ...data }: PatchJobPositionRequestDto): Promise<JobPosition> {
        const group = await this.repository.findOneAndUpdate(
            { externalKey: { source: source, key: key } },
            data
        );
        return group;
    }
}