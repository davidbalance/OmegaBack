import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
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
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Disease')
@Controller('disease-groups')
export class DiseaseGroupController {
  constructor(private readonly diseaseGroupService: DiseaseGroupService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindDiseaseGroupsResponseDTO> {
    const groups = await this.diseaseGroupService.find();
    return plainToInstance(FindDiseaseGroupsResponseDTO, { groups: groups });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateDiseaseGroupRequestDTO
  ): Promise<FindDiseaseGroupResponseDTO> {
    const disease = await this.diseaseGroupService.create(body);
    return plainToInstance(FindDiseaseGroupResponseDTO, disease);
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsDiseaseGroupDTO> {
    const options = await this.diseaseGroupService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsDiseaseGroupDTO, { options });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseGroupAndUpdateRequestDTO
  ): Promise<FindOneDiseaseGroupAndUpdateResponseDTO> {
    await this.diseaseGroupService.findOneAndUpdate(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneDiseaseGroupAndDeleteResponseDTO> {
    await this.diseaseGroupService.findOneAndDelete(id);
    return {};
  }
}
