import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { CreateCorporativeGroupRequestDTO, UpdateCorporativeGroupRequestDTO } from './dto';

@Controller('corporative-group')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }

  @Post()
  create(@Body() createCorporativeGroupDto: CreateCorporativeGroupRequestDTO) {
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
  update(@Param('id') id: string, @Body() updateCorporativeGroupDto: UpdateCorporativeGroupRequestDTO) {
    return this.corporativeGroupService.update(+id, updateCorporativeGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporativeGroupService.inactive(+id);
  }
}
