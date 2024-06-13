import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { CreateDiseaseRequestDTO, FindOneDiseaseAndUpdateRequestDTO, FindOneDiseaseAndDeleteResponseDTO, FindDiseasesResponseDTO, FindDiseaseResponseDTO, FindSelectorOptionsDiseaseDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Disease')
@ApiBearerAuth()
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindDiseasesResponseDTO> {
    const diseases = await this.diseaseService.find();
    return plainToInstance(FindDiseasesResponseDTO, { diseases: diseases });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateDiseaseRequestDTO
  ): Promise<FindDiseaseResponseDTO> {
    const disease = await this.diseaseService.create(body);
    return plainToInstance(FindDiseaseResponseDTO, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseAndUpdateRequestDTO
  ): Promise<FindDiseaseResponseDTO> {
    const disease = await this.diseaseService.findOneAndUpdate(id, body);
    return plainToInstance(FindDiseaseResponseDTO, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneDiseaseAndDeleteResponseDTO> {
    await this.diseaseService.findOneAndDelete(id);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector/:group')
  async findSelectorOptions(
    @Param("group") group: number
  ): Promise<FindSelectorOptionsDiseaseDTO> {
    const options = await this.diseaseService.findSelectorOptions(group);
    return plainToInstance(FindSelectorOptionsDiseaseDTO, { options: options });
  }
}
