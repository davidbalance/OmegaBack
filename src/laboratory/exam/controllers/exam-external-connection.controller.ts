import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { GETExamResponseDto } from "../dtos/get.exam.dto";
import { PATCHExamRequestDto } from "../dtos/patch.exam.dto";
import { POSTExamExternalConnectionRequestDto, POSTExamRequestDto } from "../dtos/post.exam.dto";

@ApiTags('External/Connection', 'Laboratory/Exam')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/exams')
export class ExamExternalConnectionController {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly service: ExamExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Body() body: POSTExamExternalConnectionRequestDto
    ): Promise<GETExamResponseDto> {
        const exam = await this.service.create(body);
        return plainToInstance(GETExamResponseDto, exam);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHExamRequestDto
    ): Promise<GETExamResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key: key }, body);
        return plainToInstance(GETExamResponseDto, exam);
    }
}