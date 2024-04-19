import { Controller, Get, Header, Param, StreamableFile, UseGuards } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Medical Result')
@Controller('medical-report')
export class MedicalReportController {

  constructor(
    private readonly medicalReportService: MedicalReportService,
  ) { }

  @Authorize(ClaimEnum.READ, 'medical-report')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get('pdf/:id')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="reporte-medico.pdf"')
  async getPdf(
    @Param('id') id: number
  ): Promise<StreamableFile> {
    return await this.medicalReportService.getPdf(id);
  }

}
