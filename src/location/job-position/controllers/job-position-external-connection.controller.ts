import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { PostExternalJobPositionRequestDto } from "../dtos/request/external-job-position.post.dto";
import { PostJobPositionResponseDto } from "../dtos/response/job-position.post.dto";
import { PatchExternalJobPositionRequestDto } from "../dtos/request/external-job-position.patch.dto";
import { PatchJobPositionResponseDto } from "../dtos/response/job-position.patch.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";

@ApiTags('Location/Job/Position', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/job/position/:source/:key')
export class JobPositionExternalConnectionController {
    constructor(
        @Inject(JobPositionExternalConnectionService) private readonly service: JobPositionExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExternalJobPositionRequestDto
    ): Promise<PostJobPositionResponseDto> {
        const position = await this.service.create({ source, key }, body);
        return plainToInstance(PostJobPositionResponseDto, position);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExternalJobPositionRequestDto
    ): Promise<PatchJobPositionResponseDto> {
        const position = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchJobPositionResponseDto, position);
    }
}