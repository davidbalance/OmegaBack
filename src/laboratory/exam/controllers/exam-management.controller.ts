import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExamManagementService } from "../services/exam-management.service";
import { plainToInstance } from "class-transformer";
import { GetExamResponseDto } from "../dtos/response/exam.get.dto";
import { PatchExamRequestDto } from "../dtos/request/exam.patch.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Laboratory/Exam')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exams')
export class ExamManagementController {
    constructor(
        @Inject(ExamManagementService) private readonly service: ExamManagementService
    ) { }

    @Get('exam/:id')
    async findOne(
        @Param('id') id: number
    ): Promise<GetExamResponseDto> {
        const exam = await this.service.findOne(id);
        return plainToInstance(GetExamResponseDto, exam);
    }

    @Patch('exam/:id')
    async updateOne(
        @Param('id') id: number,
        @Body() body: PatchExamRequestDto
    ): Promise<any> {
        await this.service.updateOne(id, body);
        return {}
    }
}