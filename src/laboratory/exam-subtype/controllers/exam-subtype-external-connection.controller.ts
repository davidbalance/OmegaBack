import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamSubtypeExternalConnectionService } from "../services/exam-subtype-external-connection.service";
import { PostExamSubtypeRequestDto } from "../dtos/request/post.exam-subtype.dto";
import { PostExamSubtypeResponseDto } from "../dtos/response/post.exam-subtype.response.dto";
import { PatchExamSubtypeResponseDto } from "../dtos/response/patch.exam-subtype.response.dto";
import { PatchExamSubtypeExternalRequestDto } from "../dtos/request/patch.exam-subtype-external.dto";

@ApiTags('External/Connection', 'Laboratory/Exam/Subtype')
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
    ): Promise<PostExamSubtypeResponseDto> {
        const exam = await this.service.create({ source, key }, body);
        return plainToInstance(PostExamSubtypeResponseDto, exam);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamSubtypeExternalRequestDto
    ): Promise<PatchExamSubtypeResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExamSubtypeResponseDto, exam);
    }
}