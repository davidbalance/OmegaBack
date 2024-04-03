import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Result')
@Controller('medical-report')
export class MedicalReportController {

  constructor(
    private readonly medicalReportService: MedicalReportService,
  ) { }

  @Get('pdf/:id')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="reporte-medico.pdf"')
  async getPdf(
    @Param('id') id: number
  ): Promise<StreamableFile> {
    return await this.medicalReportService.getPdf(id);
  }

}
