import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { JobPositionManagementService } from '../services/job-position-management.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostJobPositionRequestDto } from '../dtos/request/post.job-position.request.dto';
import { PostJobPositionResponseDto } from '../dtos/response/post.job-position.dto';
import { plainToInstance } from 'class-transformer';
import { GetJobPositionArrayReponseDto } from '../dtos/response/get.job-position-array.dto';
import { GetJobPositionResponseDto } from '../dtos/response/get.job-position.dto';
import { PatchJobPositionRequestDto } from '../dtos/request/patch.job-position.request.dto';
import { PatchJobPositionResponseDto } from '../dtos/response/patch.job-position.dto';
import { DeleteJobPositionResponseDto } from '../dtos/response/delete.job-position.dto';

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
    @Body() createJobPositionDto: PostJobPositionRequestDto
  ): Promise<PostJobPositionResponseDto> {
    const position = await this.jobPositionService.create(createJobPositionDto);
    return plainToInstance(PostJobPositionResponseDto, position);
  }

  @Get()
  async findAll(): Promise<GetJobPositionArrayReponseDto> {
    const data = await this.jobPositionService.findAll();
    return plainToInstance(GetJobPositionArrayReponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetJobPositionResponseDto> {
    const position = await this.jobPositionService.findOne(+id);
    return plainToInstance(GetJobPositionResponseDto, position);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: PatchJobPositionRequestDto
  ): Promise<PatchJobPositionResponseDto> {
    const position = await this.jobPositionService.updateOne(+id, data);
    return plainToInstance(PatchJobPositionResponseDto, position);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DeleteJobPositionResponseDto> {
    await this.jobPositionService.deleteOne(+id);
    return {};
  }
}
