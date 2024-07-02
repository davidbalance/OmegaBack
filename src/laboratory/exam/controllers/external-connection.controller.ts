import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExternalConnectionService } from "../services/external-connection.service";
import { POSTExamRequestDto, PATCHExamRequestDto } from "../dtos/exam.request.dto";
import { GETExamResponseDto } from "../dtos/exam.response.dto";

@ApiTags('External/Connection', 'Laboratory/Exam')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/exams/:source')
export class ExternalConnectionController {
    constructor(
        @Inject(ExternalConnectionService) private readonly service: ExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTExamRequestDto
    ): Promise<GETExamResponseDto> {
        const exam = await this.service.create({ source, ...body });
        return plainToInstance(GETExamResponseDto, exam);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHExamRequestDto
    ): Promise<GETExamResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key: key }, body);
        return plainToInstance(GETExamResponseDto, exam);
    }
}