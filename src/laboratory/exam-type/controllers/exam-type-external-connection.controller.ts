import { Controller, Inject, UseGuards, Post, Param, Body, Patch } from "@nestjs/common";
import { ApiTags, ApiHeader } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamTypeExternalConnectionService } from "../services/exam-type-external-connection.service";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExamTypeRequestDto } from "../dtos/request/exam-type.post.dto";
import { PostExtendedExamType } from "../dtos/response/extended-exam-type.post.dto";
import { PatchExamExternalRequestDto } from "@/laboratory/exam/dtos/request/external-exam.patch.dto";
import { PatchExtendedExamResponseDto } from "@/laboratory/exam/dtos/response/extended-exam.patch.dto";

@ApiTags('External Connection', 'Laboratory>Exam Type')
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
    ): Promise<PostExtendedExamType> {
        const exam = await this.service.create({ source, key }, body);
        return plainToInstance(PostExtendedExamType, exam);
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