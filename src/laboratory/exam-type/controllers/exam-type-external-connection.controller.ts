import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamTypeExternalConnectionService } from "../services/exam-type-external-connection.service";
import { PostExamTypeRequestDto } from "../dtos/request/post.exam-type.dto";
import { PostExamTypeResponseDto } from "../dtos/response/post.exam-type.dto";
import { PatchExamRequestDto } from "@/laboratory/exam/dtos/request/patch.exam.request.dto";
import { PatchExamTypeResponseDto } from "../dtos/response/patch.exam-type.dto";

@ApiTags('External/Connection', 'Laboratory/Exam/Type')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/exam/types/:source/:key')
export class ExamTypeExternalConnectionController {
    constructor(
        @Inject(ExamTypeExternalConnectionService) private readonly service: ExamTypeExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExamTypeRequestDto
    ): Promise<PostExamTypeResponseDto> {
        const exam = await this.service.create({ source, key }, body);
        return plainToInstance(PostExamTypeResponseDto, exam);
    }

    @Patch(':source/:key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExamRequestDto
    ): Promise<PatchExamTypeResponseDto> {
        const exam = await this.service.findOneAndUpdate({ source, key }, body);
        return plainToInstance(PatchExamTypeResponseDto, exam);
    }
}