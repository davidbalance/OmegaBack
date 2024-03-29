import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';
import { CreateWebLogoDto } from './dto/create-web-logo.dto';
import { UpdateWebLogoDto } from './dto/update-web-logo.dto';

@Controller('web-logo')
export class WebLogoController {
  constructor(private readonly webLogoService: WebLogoService) {}

  @Post()
  create(@Body() createWebLogoDto: CreateWebLogoDto) {
    return this.webLogoService.create(createWebLogoDto);
  }

  @Get()
  findAll() {
    return this.webLogoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webLogoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebLogoDto: UpdateWebLogoDto) {
    return this.webLogoService.update(+id, updateWebLogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webLogoService.remove(+id);
  }
}
