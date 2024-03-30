import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { DiseaseService } from './disease.service';
import {
  CreateDiseaseRequestDTO,
  CreateDiseaseResponseDTO,
  FindMorbiditiesResponseDTO,
  FindDiseaseSelectorOptionsResponseDTO,
  FindOneDiseaseAndUpdateRequestDTO,
  FindOneDiseaseAndUpdateResponseDTO
} from './dtos';

@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @Post()
  async create(
    @Body() body: CreateDiseaseRequestDTO
  ): Promise<CreateDiseaseResponseDTO> {
    await this.diseaseService.create(body);
    return;
  }

  @Get()
  async find(): Promise<FindMorbiditiesResponseDTO> {
    const diseases = await this.diseaseService.find();
    return { diseases };
  }

  @Get('selector')
  async findSelectorOptions(
    @Param('id') id: number
  ): Promise<FindDiseaseSelectorOptionsResponseDTO> {
    const options = await this.diseaseService.findSelectorOptions();
    return { options };
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseAndUpdateRequestDTO
  ): Promise<FindOneDiseaseAndUpdateResponseDTO> {
    await this.diseaseService.findOneAndUpdate(id, body);
    return;
  }
}
