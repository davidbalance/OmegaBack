import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { AreaService } from './area.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PATCHAreaRequestDto, POSTAreaRequestDto } from './dto/area.request.dto';
import { DELETEAreaResponseDto, GETAreaArrayResponseDto, PATCHAreaResponseDto, POSTAreaResponseDto } from './dto/area.response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Location/Area')
@ApiBearerAuth()
@Controller('area')
export class AreaController {
  constructor(
    @Inject(AreaService) private readonly service: AreaService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<GETAreaArrayResponseDto> {
    const areas = await this.service.find();
    return plainToInstance(GETAreaArrayResponseDto, { areas });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAreaDto: POSTAreaRequestDto
  ): Promise<POSTAreaResponseDto> {
    const area = await this.service.create(createAreaDto);
    return plainToInstance(POSTAreaResponseDto, area);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: string,
    @Body() updateAreaDto: PATCHAreaRequestDto
  ): Promise<PATCHAreaResponseDto> {
    const area = await this.service.findOneByIdAndUpdate(+id, updateAreaDto);
    return plainToInstance(PATCHAreaResponseDto, area);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<DELETEAreaResponseDto> {
    await this.service.findOneByIdAndDelete(+id);
    return {};
  }
}
