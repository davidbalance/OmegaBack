import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { DiseaseService } from './disease.service';
import {
  CreateDiseaseRequestDTO,
  FindOneDiseaseAndUpdateRequestDTO,
  FindOneDiseaseAndDeleteResponseDTO,
  FindDiseasesResponseDTO,
  FindDiseaseResponseDTO,
  FindSelectorOptionsDiseaseDTO,
} from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Disease')
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @Get()
  async find(): Promise<FindDiseasesResponseDTO> {
    const diseases = await this.diseaseService.find();
    return plainToInstance(FindDiseasesResponseDTO, { diseases: diseases });
  }

  @Post()
  async create(
    @Body() body: CreateDiseaseRequestDTO
  ): Promise<FindDiseaseResponseDTO> {
    const disease = await this.diseaseService.create(body);
    return plainToInstance(FindDiseaseResponseDTO, disease);
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseAndUpdateRequestDTO
  ): Promise<FindDiseaseResponseDTO> {
    const disease = await this.diseaseService.findOneAndUpdate(id, body);
    return plainToInstance(FindDiseaseResponseDTO, disease);
  }

  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneDiseaseAndDeleteResponseDTO> {
    await this.diseaseService.findOneAndDelete(id);
    return {};
  }

  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsDiseaseDTO> {
    const options = await this.diseaseService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsDiseaseDTO, { options: options });
  }
}
