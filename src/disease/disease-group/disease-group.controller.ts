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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Disease')
@ApiBearerAuth()
@Controller('disease-groups')
export class DiseaseGroupController {
  constructor(private readonly diseaseGroupService: DiseaseGroupService) { }

  @Authorize(ClaimEnum.READ, 'disease-group')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindDiseaseGroupsResponseDTO> {
    const groups = await this.diseaseGroupService.find();
    return plainToInstance(FindDiseaseGroupsResponseDTO, { groups: groups });
  }

  @Authorize(ClaimEnum.CREATE, 'disease-group')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post()
  async create(
    @Body() body: CreateDiseaseGroupRequestDTO
  ): Promise<FindDiseaseGroupResponseDTO> {
    const disease = await this.diseaseGroupService.create(body);
    return plainToInstance(FindDiseaseGroupResponseDTO, disease);
  }

  @Authorize(ClaimEnum.UPDATE, 'disease-group')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseGroupAndUpdateRequestDTO
  ): Promise<FindOneDiseaseGroupAndUpdateResponseDTO> {
    await this.diseaseGroupService.findOneAndUpdate(id, body);
    return {};
  }

  @Authorize(ClaimEnum.DELETE, 'disease-group')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneDiseaseGroupAndDeleteResponseDTO> {
    await this.diseaseGroupService.findOneAndDelete(id);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsDiseaseGroupDTO> {
    const options = await this.diseaseGroupService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsDiseaseGroupDTO, { options });
  }
}
