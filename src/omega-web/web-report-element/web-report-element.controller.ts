import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebReportElementService } from './web-report-element.service';
import { CreateWebReportElementDto } from './dto/create-web-report-element.dto';
import { UpdateWebReportElementDto } from './dto/update-web-report-element.dto';

@Controller('web-report-element')
export class WebReportElementController {
  constructor(private readonly webReportElementService: WebReportElementService) {}

  @Post()
  create(@Body() createWebReportElementDto: CreateWebReportElementDto) {
    return this.webReportElementService.create(createWebReportElementDto);
  }

  @Get()
  findAll() {
    return this.webReportElementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webReportElementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebReportElementDto: UpdateWebReportElementDto) {
    return this.webReportElementService.update(+id, updateWebReportElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webReportElementService.remove(+id);
  }
}
