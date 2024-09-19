import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PostMedicalReportRequestDto } from "../dtos/request/medical-report.post.dto";
import { MedicalReportManagementService } from "../services/medical-report-management.service";
import { PostMedicalReportResponseDto } from "../dtos/response/medical-report.post.dto";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical>Report')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/report')
export class MedicalReportManagementController {
    constructor(
        @Inject(MedicalReportManagementService) private readonly service: MedicalReportManagementService
    ) { }

    @Post()
    async create(
        @Body() body: PostMedicalReportRequestDto
    ): Promise<PostMedicalReportResponseDto> {
        const data = await this.service.create(body);
        return plainToInstance(PostMedicalReportResponseDto, data);
    }
}