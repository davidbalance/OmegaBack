import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';
import { CreateMorbidityGroupResponseDTO, FindMorbidityGroupsResponseDTO, InactiveMorbiditGroupResponseDTO, UpdateMorbidityGroupResponseDTO } from '@/shared/dtos/morbidity-group.response.dto';
import { CreateMorbidityGroupRequestDTO, UpdateMorbidityGroupRequestDTO } from '@/shared/dtos/morbidity-group.request.dto';

@Controller('morbidity-groups')
export class MorbidityGroupController {
  constructor(private readonly morbidityGroupService: MorbidityGroupService) { }

  @Post()
  async create(
    @Body() body: CreateMorbidityGroupRequestDTO
  ): Promise<CreateMorbidityGroupResponseDTO> {
    await this.morbidityGroupService.create(body);
    return;
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
  ): Promise<UpdateMorbidityGroupResponseDTO> {
    await this.morbidityGroupService.update(id, body);
    return;
  }

  @Delete(':id')
  async findOneAndInactive(
    @Param("id") id: number
  ): Promise<InactiveMorbiditGroupResponseDTO> {
    await this.morbidityGroupService.inactive(id);
    return;
  }
}
