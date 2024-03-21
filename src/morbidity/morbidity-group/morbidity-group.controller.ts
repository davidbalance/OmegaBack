import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';
import { FindMorbidityGroupsResponseDTO } from '@/shared/dtos/morbidity-group.response.dto';
import { CreateMorbidityGroupRequestDTO, UpdateMorbidityGroupRequestDTO } from '@/shared/dtos/morbidity-group.request.dto';

@Controller('morbidity-groups')
export class MorbidityGroupController {
  constructor(private readonly morbidityGroupService: MorbidityGroupService) { }

  @Post()
  async create(
    @Body() body: CreateMorbidityGroupRequestDTO
  ): Promise<void> {
    await this.morbidityGroupService.create(body);
  }

  @Get()
  async find(): Promise<FindMorbidityGroupsResponseDTO> {
    const groups = await this.morbidityGroupService.find();
    return { groups };
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: UpdateMorbidityGroupRequestDTO
  ): Promise<void> {
    await this.morbidityGroupService.update(id, body);
  }

  @Delete(':id')
  async findOneAndInactive(
    @Param("id") id: number
  ): Promise<void> {
    await this.morbidityGroupService.inactive(id);
  }
}
