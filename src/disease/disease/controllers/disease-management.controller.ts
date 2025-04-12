import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DiseaseManagementService } from '../services/disease-management.service';
import { GetDiseaseArrayResponseDto } from '../dtos/response/get.disease-array.response.dto';
import { PostDiseaseRequestDto } from '../dtos/request/post.disease.request.dto';
import { PostDiseaseResponseDto } from '../dtos/response/post.disease.response.dto';
import { PatchDiseaseRequestDto } from '../dtos/request/patch.disease.request.dto';
import { PatchDiseaseResponseDto } from '../dtos/response/patch.disease.response.dto';
import { DeleteDiseaseResponseDto } from '../dtos/response/delete.disease.response.dto';

@ApiTags('Disease/Disease')
@ApiBearerAuth()
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseManagementService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GetDiseaseArrayResponseDto> {
    const data = await this.diseaseService.find();
    return plainToInstance(GetDiseaseArrayResponseDto, { data });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: PostDiseaseRequestDto
  ): Promise<PostDiseaseResponseDto> {
    const disease = await this.diseaseService.create(body);
    return plainToInstance(PostDiseaseResponseDto, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PatchDiseaseRequestDto
  ): Promise<PatchDiseaseResponseDto> {
    const disease = await this.diseaseService.updateOne(id, body);
    return plainToInstance(PatchDiseaseResponseDto, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<DeleteDiseaseResponseDto> {
    await this.diseaseService.deleteOne(id);
    return {};
  }
}