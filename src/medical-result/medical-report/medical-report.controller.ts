import { Controller, Get, Header, Inject, Param, StreamableFile } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { PdfManagerService } from '@/shared';

@Controller('medical-report')
export class MedicalReportController {

  constructor(
    private readonly medicalReportService: MedicalReportService,
    @Inject(PdfManagerService) private readonly pdfService: PdfManagerService
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
