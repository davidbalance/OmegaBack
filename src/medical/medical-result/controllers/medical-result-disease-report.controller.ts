import { Body, Controller, Get, Inject, Logger, Post, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { MedicalResultDiseaseReportService } from "../services/medical-result-disease-report.service";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";
import { plainToInstance } from "class-transformer";
import { GetMedicalResultYearArrayResponseDto } from "../dtos/response/medical-result-year-array.get.dto";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/medical-result-disease-report.post.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical>Result>Disease')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/result/disease/report')
export class MedicalResultDiseaseReportController {
    constructor(
        @Inject(MedicalResultDiseaseReportService) private readonly service: MedicalResultDiseaseReportService
    ) { }

    @Post()
    async generateReport(
        @Body() body: PostMedicalResultDiseaseReportRequestDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const file = await this.service.generateReport(body);
        response.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="medical-result-disease-report.xlsx"',
        });
        return file;
    }

    @Get('year')
    async findYears(): Promise<GetMedicalResultYearArrayResponseDto> {
        const data = await this.service.getCurrentYears();
        return plainToInstance(GetMedicalResultYearArrayResponseDto, { data });
    }
}