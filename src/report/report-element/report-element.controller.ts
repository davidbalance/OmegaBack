import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportElementService } from './report-element.service';
import { CreateReportElementDto } from './dto/create-report-element.dto';
import { UpdateReportElementDto } from './dto/update-report-element.dto';

@Controller('report-element')
export class ReportElementController {
  constructor(private readonly reportElementService: ReportElementService) {}

  @Post()
  create(@Body() createReportElementDto: CreateReportElementDto) {
    return this.reportElementService.create(createReportElementDto);
  }

  @Get()
  findAll() {
    return this.reportElementService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportElementService.readOneByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportElementDto: UpdateReportElementDto) {
    return this.reportElementService.update(+id, updateReportElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportElementService.remove(+id);
  }
}
