import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DiseaseManagementService } from '../services/disease-management.service';
import { PostDiseaseRequestDto } from '../dtos/request/disease.post.dto';
import { PatchDiseaseRequestDto } from '../dtos/request/disease.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetDiseaseResponseDto } from '../dtos/response/disease.get.dto';

@ApiTags('Disease/Disease')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diseases')
export class DiseaseManagementController {
  constructor(
    @Inject(DiseaseManagementService) private readonly service: DiseaseManagementService
  ) { }

  @Post()
  async create(
    @Body() body: PostDiseaseRequestDto
  ): Promise<any> {
    await this.service.create(body);
    return {}
  }

  @Get("disease/:id")
  async findOne(
    @Param('id') id: number
  ): Promise<GetDiseaseResponseDto> {
    const disease = await this.service.findOne(id);
    return plainToInstance(GetDiseaseResponseDto, disease);
  }

  @Patch("disease/:id")
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchDiseaseRequestDto
  ): Promise<any> {
    await this.service.updateOne(id, body);
    return {}
  }

  @Delete("disease/:id")
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.deleteOne(id);
    return {};
  }
}