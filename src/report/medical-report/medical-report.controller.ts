import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { CreateMedicalReportDto } from './dto/create-medical-report.dto';
import { UpdateMedicalReportDto } from './dto/update-medical-report.dto';

@Controller('medical-report')
export class MedicalReportController {
  constructor(private readonly medicalReportService: MedicalReportService) {}

  @Post()
  create(@Body() createMedicalReportDto: CreateMedicalReportDto) {
    return this.medicalReportService.create(createMedicalReportDto);
  }

  @Get()
  findAll() {
    return this.medicalReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalReportDto: UpdateMedicalReportDto) {
    return this.medicalReportService.update(+id, updateMedicalReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalReportService.remove(+id);
  }
}
