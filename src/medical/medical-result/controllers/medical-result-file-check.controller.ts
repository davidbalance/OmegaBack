import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { Controller, Get, Inject, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MedicalResultFileCheckService } from "../services/medical-result-file-check.service";
import { Response } from "express";

@ApiTags('Medical>Result')
@ApiBearerAuth()
@Controller('medical/results/file/check')
@UseGuards(JwtAuthGuard)
export class MedicalResultFileCheckController {
    constructor(
        @Inject(MedicalResultFileCheckService) private readonly service: MedicalResultFileCheckService
    ) { }

    @Get()
    async generateReport(
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const file = await this.service.generateReport();
        response.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="resultados_medicos_no_encontrados.xlsx"',
        });
        return file;
    }
}
