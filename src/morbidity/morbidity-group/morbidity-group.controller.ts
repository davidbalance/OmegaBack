import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';
import { CreateMorbidityGroupDto } from './dto/create-morbidity-group.dto';
import { UpdateMorbidityGroupDto } from './dto/update-morbidity-group.dto';

@Controller('morbidity-group')
export class MorbidityGroupController {
  constructor(private readonly morbidityGroupService: MorbidityGroupService) {}

  @Post()
  create(@Body() createMorbidityGroupDto: CreateMorbidityGroupDto) {
    return this.morbidityGroupService.create(createMorbidityGroupDto);
  }

  @Get()
  findAll() {
    return this.morbidityGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.morbidityGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMorbidityGroupDto: UpdateMorbidityGroupDto) {
    return this.morbidityGroupService.update(+id, updateMorbidityGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.morbidityGroupService.remove(+id);
  }
}
