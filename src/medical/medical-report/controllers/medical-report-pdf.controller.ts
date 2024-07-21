import { Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { MedicalReportPdfService } from "../services/medical-report-pdf.service";

@ApiTags('Medical/Report')
@ApiBearerAuth()
@Controller('medical/report')
export class MedicalReportPdfController {
    constructor(
        @Inject(MedicalReportPdfService) private readonly service: MedicalReportPdfService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('recreate/pdf')
    async recreateAllReports(): Promise<any> {
        await this.service.redoPdfs();
        return {};
    }

    @UseGuards(JwtAuthGuard)
    @Get('recreate/pdf/:dni')
    async recreateReportsByPatientDni(
        @Param('dni') dni: string
    ): Promise<any> {
        await this.service.redoPdfsByDni(dni);
        return {};
    }
}