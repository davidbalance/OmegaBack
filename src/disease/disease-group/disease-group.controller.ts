import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { DiseaseGroupService } from './disease-group.service';
import {
  CreateDiseaseGroupRequestDTO,
  FindDiseaseGroupResponseDTO,
  FindDiseaseGroupsResponseDTO,
  FindOneDiseaseGroupAndDeleteResponseDTO,
  FindOneDiseaseGroupAndUpdateRequestDTO,
  FindOneDiseaseGroupAndUpdateResponseDTO,
  FindSelectorOptionsDiseaseGroupDTO,
} from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Disease')
@Controller('disease-groups')
export class DiseaseGroupController {
  constructor(private readonly diseaseGroupService: DiseaseGroupService) { }

  @Get()
  async find(): Promise<FindDiseaseGroupsResponseDTO> {
    const groups = await this.diseaseGroupService.find();
    return plainToInstance(FindDiseaseGroupsResponseDTO, { groups: groups });
  }

  @Post()
  async create(
    @Body() body: CreateDiseaseGroupRequestDTO
  ): Promise<FindDiseaseGroupResponseDTO> {
    const disease = await this.diseaseGroupService.create(body);
    return plainToInstance(FindDiseaseGroupResponseDTO, disease);
  }

  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsDiseaseGroupDTO> {
    const options = await this.diseaseGroupService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsDiseaseGroupDTO, { options });
  }

  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseGroupAndUpdateRequestDTO
  ): Promise<FindOneDiseaseGroupAndUpdateResponseDTO> {
    await this.diseaseGroupService.findOneAndUpdate(id, body);
    return {};
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneDiseaseGroupAndDeleteResponseDTO> {
    await this.diseaseGroupService.findOneAndDelete(id);
    return {};
  }
}
