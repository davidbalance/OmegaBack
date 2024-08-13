import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DiseaseManagementService } from '../services/disease-management.service';
import { GetDiseaseArrayResponseDto } from '../dtos/response/get.disease-array.response.dto';
import { PostDiseaseRequestDto } from '../dtos/request/post.disease.request.dto';
import { PostDiseaseResponseDto } from '../dtos/response/post.disease.response.dto';
import { PatchDiseaseRequestDto } from '../dtos/request/patch.disease.request.dto';
import { PatchDiseaseResponseDto } from '../dtos/response/patch.disease.response.dto';
import { DeleteDiseaseResponseDto } from '../dtos/response/delete.disease.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Disease/Disease')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diseases')
export class DiseaseController {
  constructor(
    @Inject(DiseaseManagementService) private readonly service: DiseaseManagementService
  ) { }

  @Get()
  async find(): Promise<GetDiseaseArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetDiseaseArrayResponseDto, { data });
  }

  @Post()
  async create(
    @Body() body: PostDiseaseRequestDto
  ): Promise<PostDiseaseResponseDto> {
    const disease = await this.service.create(body);
    return plainToInstance(PostDiseaseResponseDto, disease);
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PatchDiseaseRequestDto
  ): Promise<PatchDiseaseResponseDto> {
    const disease = await this.service.updateOne(id, body);
    return plainToInstance(PatchDiseaseResponseDto, disease);
  }

  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<DeleteDiseaseResponseDto> {
    await this.service.deleteOne(id);
    return {};
  }
}