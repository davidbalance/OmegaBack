import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamExternalConnectionService } from "../services/exam-external-connection.service";
import { PostExamExternalRequestDto } from "../dtos/request/external-exam.post.dto";
import { PatchExamExternalRequestDto } from "../dtos/request/external-exam.patch.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExtendedExamResponseDto } from "../dtos/response/extended-exam.post.dto";
import { PatchExtendedExamResponseDto } from "../dtos/response/extended-exam.patch.dto";

@ApiTags('External Connection', 'Laboratory>Exam')
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
    ): Promise<PostExtendedExamResponseDto> {
        const exam = await this.service.create({ source, key }, body);
        return plainToInstance(PostExtendedExamResponseDto, exam);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamExternalRequestDto
    ): Promise<PatchExtendedExamResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExtendedExamResponseDto, exam);
    }
}