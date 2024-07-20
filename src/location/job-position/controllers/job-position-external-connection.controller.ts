import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PATCHJobPositionRequestDto, PATCHJobPositionResponseDto } from "../dtos/patch.job-position.dto";
import { POSTJobPositionRequestDto, POSTJobPositionResponseDto } from "../dtos/post.job-position.dto";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { POSTJobPositionExternalConnectionRequestDto } from "../dtos/post.job-position-external-connection.dto";

@ApiTags('Location/Corporative/Group', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/job/position')
export class JobPositionExternalConnectionController {
    constructor(
        @Inject(JobPositionExternalConnectionService) private readonly service: JobPositionExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Body() body: POSTJobPositionExternalConnectionRequestDto
    ): Promise<POSTJobPositionResponseDto> {
        const group = await this.service.create(body);
        return plainToInstance(POSTJobPositionResponseDto, group);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHJobPositionRequestDto
    ): Promise<PATCHJobPositionResponseDto> {
        const group = await this.service.findOneAndUpdate({ key: key, source }, body);
        return plainToInstance(PATCHJobPositionResponseDto, group);
    }
}