import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MorbidityService } from './morbidity.service';
import { CreateMorbidityRequestDTO, UpdateMorbidityRequestDTO } from '@/shared/dtos/morbidity.request.dto';
import { FindMorbidityResponseDTO, FindOneMorbidityResponseDTO } from '@/shared/dtos/morbidity.response.dto';

@Controller('morbidity')
export class MorbidityController {
  constructor(private readonly morbidityService: MorbidityService) { }

  @Post()
  async create(
    @Body() body: CreateMorbidityRequestDTO
  ): Promise<void> {
    await this.morbidityService.create(body);
  }

  @Get()
  async find(): Promise<FindMorbidityResponseDTO> {
    const morbidities = await this.morbidityService.find();
    return { morbidities };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<FindOneMorbidityResponseDTO> {
    const morbidity = await this.morbidityService.findOne({ id: id });
    return { morbidity };
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: UpdateMorbidityRequestDTO
  ): Promise<void> {
    await this.morbidityService.update(id, body);
  }

  @Delete(':id')
  async findOneAndInactive(
    @Param("id") id: number
  ): Promise<void> {
    await this.morbidityService.inactive(id);
  }
}
