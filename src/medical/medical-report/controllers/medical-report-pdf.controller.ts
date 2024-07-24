import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { MedicalReportPdfService } from "../services/medical-report-pdf.service";

@ApiTags('Medical/Report')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/report/recreate/pdf')
export class MedicalReportPdfController {
    constructor(
        @Inject(MedicalReportPdfService) private readonly service: MedicalReportPdfService
    ) { }

    @Get()
    async recreateAllReports(): Promise<any> {
        await this.service.redoPdfs();
        return {};
    }

    @Get(':dni')
    async recreateReportsByPatientDni(
        @Param('dni') dni: string
    ): Promise<any> {
        await this.service.redoPdfsByDni(dni);
        return {};
    }
}