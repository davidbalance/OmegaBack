import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamSubtypeExternalConnectionService } from "../services/exam-subtype-external-connection.service";
import { PostExamSubtypeRequestDto } from "../dtos/request/exam-subtype.post.dto";
import { PatchExamSubtypeExternalRequestDto } from "../dtos/request/external-exam-subtype.patch.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PatchExtendedExamResponseDto } from "@/laboratory/exam/dtos/response/extended-exam.patch.dto";
import { PostExtendedExamResponseDto } from "@/laboratory/exam/dtos/response/extended-exam.post.dto";

@ApiTags('External Connection', 'Laboratory>Exam Subtype')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/exam/subtypes/:source/:key')
export class ExamSubtypeExternalConnectionController {
    constructor(
        @Inject(ExamSubtypeExternalConnectionService) private readonly service: ExamSubtypeExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExamSubtypeRequestDto
    ): Promise<PostExtendedExamResponseDto> {
        const exam = await this.service.findOneOrCreate({ source, key }, body);
        return plainToInstance(PostExtendedExamResponseDto, exam);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamSubtypeExternalRequestDto
    ): Promise<PatchExtendedExamResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExtendedExamResponseDto, exam);
    }
}