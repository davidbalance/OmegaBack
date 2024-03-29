import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { MorbidityService } from './morbidity.service';
import {
  CreateMorbidityRequestDTO,
  CreateMorbidityResponseDTO,
  FindMorbiditiesResponseDTO,
  FindMorbiditySelectorOptionsResponseDTO,
  FindOneMorbidityAndUpdateRequestDTO,
  FindOneMorbidityAndUpdateResponseDTO
} from './dtos';

@Controller('morbidities')
export class MorbidityController {
  constructor(private readonly morbidityService: MorbidityService) { }

  @Post()
  async create(
    @Body() body: CreateMorbidityRequestDTO
  ): Promise<CreateMorbidityResponseDTO> {
    await this.morbidityService.create(body);
    return;
  }

  @Get()
  async find(): Promise<FindMorbiditiesResponseDTO> {
    const morbidities = await this.morbidityService.find();
    return { morbidities };
  }

  @Get('selector')
  async findSelectorOptions(
    @Param('id') id: number
  ): Promise<FindMorbiditySelectorOptionsResponseDTO> {
    const options = await this.morbidityService.findSelectorOptions();
    return { options };
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneMorbidityAndUpdateRequestDTO
  ): Promise<FindOneMorbidityAndUpdateResponseDTO> {
    await this.morbidityService.findOneAndUpdate(id, body);
    return;
  }
}
