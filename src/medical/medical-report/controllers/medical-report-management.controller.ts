import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { POSTMedicalReportRequestDto } from "../dtos/request/post.medical-report.request.dto";
import { MedicalReportManagementService } from "../services/medical-report-management.service";
import { PostMedicalReportResponseDto } from "../dtos/response/post.medical-report.response.dto";
import { plainToInstance } from "class-transformer";

@ApiTags('Medical/Report')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/report')
export class MedicalReportManagementController {
    constructor(
        @Inject(MedicalReportManagementService) private readonly service: MedicalReportManagementService
    ) { }

    @Post()
    async create(
        @Body() body: POSTMedicalReportRequestDto
    ): Promise<PostMedicalReportResponseDto> {
        const data = await this.service.create(body);
        return plainToInstance(PostMedicalReportResponseDto, data);
    }
}