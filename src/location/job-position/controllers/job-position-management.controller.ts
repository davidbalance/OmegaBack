import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { JobPositionManagementService } from '../services/job-position-management.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { POSTJobPositionRequestDto, POSTJobPositionResponseDto } from '../dtos/post.job-position.dto';
import { PATCHJobPositionRequestDto } from '../dtos/patch.job-position.dto';
import { plainToInstance } from 'class-transformer';
import { GETJobPositionArrayReponseDto, GETJobPositionResponseDto } from '../dtos/get.job-position.dto';
import { DELETEJobPositionResponseDto } from '../dtos/delete.job-position.dto';

@ApiTags('Location/Job/Position')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job/position')
export class JobPositionManagementController {
  constructor(
    @Inject(JobPositionManagementService) private readonly jobPositionService: JobPositionManagementService
  ) { }

  @Post()
  async create(
    @Body() createJobPositionDto: POSTJobPositionRequestDto
  ): Promise<POSTJobPositionResponseDto> {
    const position = await this.jobPositionService.create(createJobPositionDto);
    return plainToInstance(POSTJobPositionResponseDto, position);
  }

  @Get()
  async findAll(): Promise<GETJobPositionArrayReponseDto> {
    const data = await this.jobPositionService.findAll();
    return plainToInstance(GETJobPositionArrayReponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GETJobPositionResponseDto> {
    const position = await this.jobPositionService.findOne(+id);
    return plainToInstance(GETJobPositionResponseDto, position);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobPositionDto: PATCHJobPositionRequestDto
  ): Promise<PATCHJobPositionRequestDto> {
    const position = await this.jobPositionService.updateOne(+id, updateJobPositionDto);
    return plainToInstance(PATCHJobPositionRequestDto, position);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DELETEJobPositionResponseDto> {
    await this.jobPositionService.deleteOne(+id);
    return {};
  }
}
