import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportValueService } from './report-value.service';
import { CreateReportValueDto } from './dto/create-report-value.dto';
import { UpdateReportValueDto } from './dto/update-report-value.dto';

@Controller('report-value')
export class ReportValueController {
  constructor(private readonly reportValueService: ReportValueService) {}

  @Post()
  create(@Body() createReportValueDto: CreateReportValueDto) {
    return this.reportValueService.create(createReportValueDto);
  }

  @Get()
  findAll() {
    return this.reportValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportValueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportValueDto: UpdateReportValueDto) {
    return this.reportValueService.update(+id, updateReportValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportValueService.remove(+id);
  }
}
