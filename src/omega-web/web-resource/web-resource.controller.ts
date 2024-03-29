import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { CreateWebResourceDto } from './dto/create-web-resource.dto';
import { UpdateWebResourceDto } from './dto/update-web-resource.dto';

@Controller('web-resource')
export class WebResourceController {
  constructor(private readonly webResourceService: WebResourceService) {}

  @Post()
  create(@Body() createWebResourceDto: CreateWebResourceDto) {
    return this.webResourceService.create(createWebResourceDto);
  }

  @Get()
  findAll() {
    return this.webResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebResourceDto: UpdateWebResourceDto) {
    return this.webResourceService.update(+id, updateWebResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webResourceService.remove(+id);
  }
}
