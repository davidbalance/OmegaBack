import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DiseaseGroupService } from './disease-group.service';
import { CreateDiseaseGroupRequestDTO, CreateDiseaseGroupResponseDTO, FindDiseaseGroupSelectorOptionsResponseDTO, FindDiseaseGroupsResponseDTO, FindOneDiseaseGroupAndUpdateRequestDTO, FindOneDiseaseGroupAndUpdateResponseDTO } from './dtos';

@Controller('disease-groups')
export class DiseaseGroupController {
  constructor(private readonly diseaseGroupService: DiseaseGroupService) { }

  @Post()
  async create(
    @Body() body: CreateDiseaseGroupRequestDTO
  ): Promise<CreateDiseaseGroupResponseDTO> {
    await this.diseaseGroupService.create(body);
    return;
  }

  @Get()
  async find(): Promise<FindDiseaseGroupsResponseDTO> {
    const groups = await this.diseaseGroupService.find();
    return { diseaseGroups: groups };
  }

  @Get('selector')
  async findSelectorOptions(): Promise<FindDiseaseGroupSelectorOptionsResponseDTO> {
    const options = await this.diseaseGroupService.findSelectorOptions();
    return { options };
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseGroupAndUpdateRequestDTO
  ): Promise<FindOneDiseaseGroupAndUpdateResponseDTO> {
    await this.diseaseGroupService.findOneAndUpdate(id, body);
    return;
  }
}
