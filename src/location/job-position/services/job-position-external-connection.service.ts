import { IExternalConnectionService, ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject } from "@nestjs/common";
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

    async create(key: ExternalKeyParam, body: PostJobPositionRequestDto): Promise<JobPosition> {
        const newKey = await this.keyService.create(key);
        try {
            const position = await this.repository.create({ ...body, externalKey: newKey });
            return position;
        } catch (error) {
            this.keyService.remove(key)
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam, { name, ...data }: PostJobPositionRequestDto): Promise<JobPosition> {
        try {
            const foundGroup = await this.repository.findOne({
                where: [
                    { externalKey: key },
                    { name: name }
                ]
            });
            return foundGroup;
        } catch (error) {
            return this.create(key, { name, ...data });
        }
    }

    async findOneAndUpdate(key: ExternalKeyParam, { ...data }: PatchJobPositionRequestDto): Promise<JobPosition> {
        const position = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return position;
    }
}