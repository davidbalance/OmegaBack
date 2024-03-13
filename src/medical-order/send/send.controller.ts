import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SendService } from './send.service';
import { CreateSendDto } from './dto/create-send.dto';
import { UpdateSendDto } from './dto/update-send.dto';

@Controller('send')
export class SendController {
  constructor(private readonly sendService: SendService) {}

  @Post()
  create(@Body() createSendDto: CreateSendDto) {
    return this.sendService.create(createSendDto);
  }

  @Get()
  findAll() {
    return this.sendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSendDto: UpdateSendDto) {
    return this.sendService.update(+id, updateSendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sendService.remove(+id);
  }
}
