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
import { DiseaseService } from './disease.service';
import {
  CreateDiseaseRequestDTO,
  FindOneDiseaseAndUpdateRequestDTO,
  FindOneDiseaseAndDeleteResponseDTO,
  FindDiseasesResponseDTO,
  FindDiseaseResponseDTO,
  FindSelectorOptionsDiseaseDTO,
} from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Disease')
@ApiBearerAuth()
@Controller('diseases')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @Authorize(ClaimEnum.READ, 'disease')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindDiseasesResponseDTO> {
    const diseases = await this.diseaseService.find();
    return plainToInstance(FindDiseasesResponseDTO, { diseases: diseases });
  }

  @Authorize(ClaimEnum.CREATE, 'disease')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post()
  async create(
    @Body() body: CreateDiseaseRequestDTO
  ): Promise<FindDiseaseResponseDTO> {
    const disease = await this.diseaseService.create(body);
    return plainToInstance(FindDiseaseResponseDTO, disease);
  }

  @Authorize(ClaimEnum.UPDATE, 'disease')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDiseaseAndUpdateRequestDTO
  ): Promise<FindDiseaseResponseDTO> {
    const disease = await this.diseaseService.findOneAndUpdate(id, body);
    return plainToInstance(FindDiseaseResponseDTO, disease);
  }

  @Authorize(ClaimEnum.DELETE, 'disease')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Delete(":id")
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneDiseaseAndDeleteResponseDTO> {
    await this.diseaseService.findOneAndDelete(id);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsDiseaseDTO> {
    const options = await this.diseaseService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsDiseaseDTO, { options: options });
  }
}
