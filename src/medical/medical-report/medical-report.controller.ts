import { Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { MedicalReportService } from "./medical-report.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";

@ApiTags('Medical/Report')
@ApiBearerAuth()
@Controller('medical/report')
export class MedicalReportController {
    constructor(
        @Inject(MedicalReportService) private readonly service: MedicalReportService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('recreate/pdf')
    async recreateAllReports(): Promise<any> {
        await this.service.recreateReport();
        return {};
    }

    @UseGuards(JwtAuthGuard)
    @Get('recreate/pdf/:dni')
    async recreateReportsByPatientDni(
        @Param('dni') dni: string
    ): Promise<any> {
        await this.service.recreateReport(dni);
        return {};
    }
}