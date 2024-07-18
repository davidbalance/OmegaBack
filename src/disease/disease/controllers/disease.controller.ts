import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DELETEDiseaseResponseDto, GETDiseaseArrayResponseDto, PATCHDiseaseResponseDto, POSTDiseaseResponseDto } from '../dtos/disease.response.dto';
import { PATCHDiseaseRequestDto, POSTDiseaseRequestDto } from '../dtos/disease.request.dto';
import { DiseaseManagementService } from '../services/disease-management.service';

@ApiTags('Disease/Disease')
@ApiBearerAuth()
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseManagementService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETDiseaseArrayResponseDto> {
    const diseases = await this.diseaseService.find();
    return plainToInstance(GETDiseaseArrayResponseDto, { diseases: diseases });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTDiseaseRequestDto
  ): Promise<POSTDiseaseResponseDto> {
    const disease = await this.diseaseService.create(body);
    return plainToInstance(POSTDiseaseResponseDto, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PATCHDiseaseRequestDto
  ): Promise<PATCHDiseaseResponseDto> {
    const disease = await this.diseaseService.updateOne(id, body);
    return plainToInstance(PATCHDiseaseResponseDto, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<DELETEDiseaseResponseDto> {
    await this.diseaseService.deleteOne(id);
    return {};
  }
}