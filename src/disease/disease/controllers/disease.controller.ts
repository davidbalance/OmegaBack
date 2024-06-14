import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DiseaseService } from '../services/disease.service';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DELETEDiseaseResponseDTO, GETDiseaseArrayResponseDTO, PATCHDiseaseResponseDTO, POSTDiseaseResponseDTO } from '../dtos/disease.response.dto';
import { PATCHDiseaseRequestDTO, POSTDiseaseRequestDTO } from '../dtos/disease.request.dto';

@ApiTags('Disease/Disease')
@ApiBearerAuth()
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETDiseaseArrayResponseDTO> {
    const diseases = await this.diseaseService.find();
    return plainToInstance(GETDiseaseArrayResponseDTO, { diseases: diseases });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTDiseaseRequestDTO
  ): Promise<POSTDiseaseResponseDTO> {
    const disease = await this.diseaseService.create(body);
    return plainToInstance(POSTDiseaseResponseDTO, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PATCHDiseaseRequestDTO
  ): Promise<PATCHDiseaseResponseDTO> {
    const disease = await this.diseaseService.findOneAndUpdate(id, body);
    return plainToInstance(PATCHDiseaseResponseDTO, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<DELETEDiseaseResponseDTO> {
    await this.diseaseService.findOneAndDelete(id);
    return {};
  }
}