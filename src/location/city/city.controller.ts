import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityRequestDTO, UpdateCityRequestDTO } from './dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post()
  create(@Body() createCityDto: CreateCityRequestDTO) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.readOneByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityRequestDTO) {
    return this.cityService.update(+id, updateCityDto);
  }
}
