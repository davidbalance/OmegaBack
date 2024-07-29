import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { GETExamResponseDto } from "../dtos/get.exam.dto";
import { PATCHExamRequestDto } from "../dtos/patch.exam.dto";
import { POSTExamRequestDto } from "../dtos/post.exam.dto";

@ApiTags('External/Connection', 'Laboratory/Exam')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/exams/:source')
export class ExamExternalConnectionController {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly service: ExamExternalConnectionService
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