import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';
import { CreateMorbidityGroupRequestDTO, CreateMorbidityGroupResponseDTO, FindMorbidityGroupSelectorOptionsResponseDTO, FindMorbidityGroupsResponseDTO, FindOneMorbidityGroupAndUpdateRequestDTO, FindOneMorbidityGroupAndUpdateResponseDTO } from './dtos';

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
    return { morbidityGroups: groups };
  }

  @Get('selector')
  async findSelectorOptions(): Promise<FindMorbidityGroupSelectorOptionsResponseDTO> {
    const options = await this.morbidityGroupService.findSelectorOptions();
    return { options };
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneMorbidityGroupAndUpdateRequestDTO
  ): Promise<FindOneMorbidityGroupAndUpdateResponseDTO> {
    await this.morbidityGroupService.findOneAndUpdate(id, body);
    return;
  }
}
