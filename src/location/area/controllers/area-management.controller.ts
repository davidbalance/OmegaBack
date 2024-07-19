import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AreaManagementService } from '../services/area-management.service';
import { DELETEAreaResponseDto } from '../dtos/delete.area.dto';
import { GETAreaArrayResponseDto } from '../dtos/get.area.dto';
import { PATCHAreaRequestDto, PATCHAreaResponseDto } from '../dtos/patch.area.dto';
import { POSTAreaRequestDto, POSTAreaResponseDto } from '../dtos/post.area.dto';

@ApiTags('Location/Area')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('area')
export class AreaManagementController {
  constructor(
    @Inject(AreaManagementService) private readonly service: AreaManagementService
  ) { }

  @Get()
  async findAll(): Promise<GETAreaArrayResponseDto> {
    const areas = await this.service.find();
    return plainToInstance(GETAreaArrayResponseDto, { areas });
  }

  @Post()
  async create(
    @Body() createAreaDto: POSTAreaRequestDto
  ): Promise<POSTAreaResponseDto> {
    const area = await this.service.create(createAreaDto);
    return plainToInstance(POSTAreaResponseDto, area);
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: string,
    @Body() updateAreaDto: PATCHAreaRequestDto
  ): Promise<PATCHAreaResponseDto> {
    const area = await this.service.updateOne(+id, updateAreaDto);
    return plainToInstance(PATCHAreaResponseDto, area);
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<DELETEAreaResponseDto> {
    await this.service.deleteOne(+id);
    return {};
  }
}
