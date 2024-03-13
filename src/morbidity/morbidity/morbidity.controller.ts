import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MorbidityService } from './morbidity.service';
import { CreateMorbidityDto } from './dto/create-morbidity.dto';
import { UpdateMorbidityDto } from './dto/update-morbidity.dto';

@Controller('morbidity')
export class MorbidityController {
  constructor(private readonly morbidityService: MorbidityService) {}

  @Post()
  create(@Body() createMorbidityDto: CreateMorbidityDto) {
    return this.morbidityService.create(createMorbidityDto);
  }

  @Get()
  findAll() {
    return this.morbidityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.morbidityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMorbidityDto: UpdateMorbidityDto) {
    return this.morbidityService.update(+id, updateMorbidityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.morbidityService.remove(+id);
  }
}
