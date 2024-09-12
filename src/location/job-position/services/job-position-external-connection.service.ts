import { IExternalConnectionService, ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { Injectable, Inject } from "@nestjs/common";
import { PostExternalJobPositionRequestDto } from "../dtos/request/external-job-position.post.dto";
import { PatchExternalJobPositionRequestDto } from "../dtos/request/external-job-position.patch.dto";
import { JobPositionRepository } from "../repositories/job-position.repository";
import { JobPositionExternalKeyService } from "./job-position-external-key.service";
import { JobPosition } from "../dtos/response/job-position.base.dto";

type ConnectionRequestType = PostExternalJobPositionRequestDto | PatchExternalJobPositionRequestDto;

@Injectable()
export class JobPositionExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, JobPosition> {
    constructor(
        @Inject(JobPositionRepository) private readonly repository: JobPositionRepository,
        @Inject(JobPositionExternalKeyService) private keyService: JobPositionExternalKeyService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<JobPosition> {
        throw new Error("Method not implemented.");
    }

    async create(key: ExternalKeyParam, body: PostExternalJobPositionRequestDto): Promise<JobPosition> {
        const newKey = await this.keyService.create(key);
        try {
            const position = await this.repository.create({ ...body, externalKey: newKey });
            return position;
        } catch (error) {
            this.keyService.remove(key)
            throw error;
        }
    }

    async findOneOrCreate(key: ExternalKeyParam, { name, ...data }: PostExternalJobPositionRequestDto): Promise<JobPosition> {
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

    async findOneAndUpdate(key: ExternalKeyParam, { ...data }: PatchExternalJobPositionRequestDto): Promise<JobPosition> {
        const position = await this.repository.findOneAndUpdate({ externalKey: key }, data);
        return position;
    }
}