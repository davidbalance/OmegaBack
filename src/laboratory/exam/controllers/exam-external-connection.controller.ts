import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { PostExamExternalRequestDto } from "../dtos/request/post.exam-external.request.dto";
import { PostExamResponseDto } from "../dtos/response/post.exam.response.dto";
import { PatchExamRequestDto } from "../dtos/request/patch.exam.request.dto";

@ApiTags('External/Connection', 'Laboratory/Exam')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/exams/:source/:key')
export class ExamExternalConnectionController {
    constructor(
        @Inject(ExamExternalConnectionService) private readonly service: ExamExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExamExternalRequestDto
    ): Promise<PostExamResponseDto> {
        const exam = await this.service.create({ source, key }, body);
        return plainToInstance(PostExamResponseDto, exam);
    }

    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamRequestDto
    ): Promise<PatchExamRequestDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExamRequestDto, exam);
    }
}