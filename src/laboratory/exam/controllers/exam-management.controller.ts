import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExamManagementService } from "../services/exam-management.service";
import { PostExamRequestDto } from "../dtos/request/post.exam.request.dto";
import { PostExamResponseDto } from "../dtos/response/post.exam.response.dto";
import { plainToInstance } from "class-transformer";
import { GetExamResponseDto } from "../dtos/response/get.exam.response.dto";
import { GetExamArrayResponseDto } from "../dtos/response/get.exam-array.response.dto";
import { PatchExamRequestDto } from "../dtos/request/patch.exam.request.dto";
import { PatchExamResponseDto } from "../dtos/response/patch.exam.response.dto";
import { DeleteExamResponseDto } from "../dtos/response/delete.exam.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Laboratory/Exam')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exams')
export class ExamManagementController {
    constructor(
        @Inject(ExamManagementService) private readonly service: ExamManagementService
    ) { }

    @Post()
    async create(
        @Body() body: PostExamRequestDto
    ): Promise<PostExamResponseDto> {
        const exam = await this.service.create(body);
        return plainToInstance(PostExamResponseDto, exam);
    }

    @Get()
    async findAll(): Promise<GetExamArrayResponseDto> {
        const data = await this.service.findAll();
        return plainToInstance(GetExamArrayResponseDto, { data });
    }

    @Get(':id')
    async findOne(
        @Param('id') id: number
    ): Promise<GetExamResponseDto> {
        const exam = await this.service.findOne(id);
        return plainToInstance(GetExamResponseDto, exam);
    }

    @Patch(':id')
    async updateOne(
        @Param('id') id: number,
        @Body() body: PatchExamRequestDto
    ): Promise<PatchExamResponseDto> {
        const exam = await this.service.updateOne(id, body);
        return plainToInstance(PatchExamResponseDto, exam);
    }

    @Delete(':id')
    async deleteOne(
        @Param('id') id: number
    ): Promise<DeleteExamResponseDto> {
        await this.service.deleteOne(id);
        return {}
    }
}