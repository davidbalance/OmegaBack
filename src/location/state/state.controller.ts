import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateRequestDTO, UpdateStateRequestDTO } from './dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Post()
  create(@Body() createStateDto: CreateStateRequestDTO) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.readOneByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateRequestDTO) {
    return this.stateService.update(+id, updateStateDto);
  }
}
