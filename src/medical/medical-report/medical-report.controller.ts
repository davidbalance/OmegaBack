import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { MedicalReportService } from "./medical-report.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Medical/Report')
@ApiBearerAuth()
@Controller('medical/report')
export class MedicalReportController {
    constructor(
        @Inject(MedicalReportService) private readonly service: MedicalReportService
    ) { }

    @Get('recreate/pdf')
    async recreateAllReports(): Promise<any> {
        await this.service.recreateReport();
        return {};
    }

    @Get('recreate/pdf/:dni')
    async recreateReportsByPatientDni(
        @Param('dni') dni: string
    ): Promise<any> {
        await this.service.recreateReport(dni);
        return {};
    }
}