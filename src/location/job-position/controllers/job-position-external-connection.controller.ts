import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { PostJobPositionRequestDto } from "../dtos/request/post.job-position.request.dto";
import { PostJobPositionResponseDto } from "../dtos/response/post.job-position.dto";
import { PatchJobPositionRequestDto } from "../dtos/request/patch.job-position.request.dto";

@ApiTags('Location/Corporative/Group', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/job/position/:source/:key')
export class JobPositionExternalConnectionController {
    constructor(
        @Inject(JobPositionExternalConnectionService) private readonly service: JobPositionExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostJobPositionRequestDto
    ): Promise<PostJobPositionResponseDto> {
        const group = await this.service.create({ source, key }, body);
        return plainToInstance(PostJobPositionResponseDto, group);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchJobPositionRequestDto
    ): Promise<PatchJobPositionRequestDto> {
        const group = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchJobPositionRequestDto, group);
    }
}