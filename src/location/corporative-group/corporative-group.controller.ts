import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { CreateCorporativeGroupDto } from './dto/create-corporative-group.dto';
import { UpdateCorporativeGroupDto } from './dto/update-corporative-group.dto';

@Controller('corporative-group')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }

  @Post()
  create(@Body() createCorporativeGroupDto: CreateCorporativeGroupDto) {
    return this.corporativeGroupService.create(createCorporativeGroupDto);
  }

  @Get()
  findAll() {
    return this.corporativeGroupService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporativeGroupService.readOneByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorporativeGroupDto: UpdateCorporativeGroupDto) {
    return this.corporativeGroupService.update(+id, updateCorporativeGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporativeGroupService.remove(+id);
  }
}
