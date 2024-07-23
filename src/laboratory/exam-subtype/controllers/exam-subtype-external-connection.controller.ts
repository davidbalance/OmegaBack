import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamSubtypeExternalConnectionService } from "../services/exam-subtype-external-connection.service";
import { PostExamSubtypeRequestDto } from "../dto/request/post.exam-subtype.dto";
import { PostExamSubtypeResponseDto } from "../dto/response/post.exam-subtype.response.dto";
import { PatchExamSubtypeRequestDto } from "../dto/request/patch.exam-subtype.dto";
import { PatchExamSubtypeResponseDto } from "../dto/response/patch.exam-subtype.response.dto";

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

    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamSubtypeRequestDto
    ): Promise<PatchExamSubtypeResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExamSubtypeResponseDto, exam);
    }
}