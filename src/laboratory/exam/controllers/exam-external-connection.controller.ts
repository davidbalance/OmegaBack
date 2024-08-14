import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { PostExamExternalRequestDto } from "../dtos/request/post.exam-external.request.dto";
import { PostExamResponseDto } from "../dtos/response/post.exam.response.dto";
import { PatchExamResponseDto } from "../dtos/response/patch.exam.response.dto";
import { PatchExamExternalRequestDto } from "../dtos/request/patch.exam-external.request.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";

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

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamExternalRequestDto
    ): Promise<PatchExamResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExamResponseDto, exam);
    }
}