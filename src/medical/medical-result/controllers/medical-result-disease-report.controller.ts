import { Body, Controller, Get, Inject, Param, Post, Res } from "@nestjs/common";
import { MedicalResultDiseaseReportService } from "../services/medical-result-disease-report.service";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";
import { plainToInstance } from "class-transformer";
import { GetMedicalResultYearArrayResponseDto } from "../dtos/response/get.medical-result-year-array.response.dto";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/post.medical-result-disease-report.request.dto";

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/result/disease')
export class MedicalResultDiseaseReportController {
    constructor(
        @Inject(MedicalResultDiseaseReportService) private readonly service: MedicalResultDiseaseReportService
    ) { }

    @Post('report')
    async generateReport(
        @Body() body: PostMedicalResultDiseaseReportRequestDto,
        @Res() response: Response
    ) {
        const file = await this.service.generateReport(body);
        response.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="medical-result-disease-report.xlsx"',
        });
        file.getStream().pipe(response);
    }

    @Get('year')
    async findYears(): Promise<GetMedicalResultYearArrayResponseDto> {
        const data = await this.service.getCurrentYears();
        return plainToInstance(GetMedicalResultYearArrayResponseDto, { data });
    }
}