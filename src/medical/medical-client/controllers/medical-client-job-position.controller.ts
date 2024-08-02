import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Controller, Get, Param, Inject, UseGuards, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MedicalClientJobPositionService } from '../services/medical-client-job-position.service';
import { GetMedicalClientJobPositionResponseDto } from '../dtos/response/get.medical-client-job-position.response.dto';
import { PatchMedicalClientJobPositionResponseDto } from '../dtos/response/patch.medical-client-job-position.response.dto';
import { PatchMedicalClientJobPositionRequestDto } from '../dtos/request/patch.medical-client-job-position.request.dto';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client/job/position')
export class MedicalClientJobPositionController {
  constructor(
    @Inject(MedicalClientJobPositionService) private readonly service: MedicalClientJobPositionService
  ) { }

  @Get(':dni')
  async findJobPosition(
    @Param('dni') dni: string
  ): Promise<GetMedicalClientJobPositionResponseDto> {
    const data = await this.service.findOnePosition(dni);
    return plainToInstance(GetMedicalClientJobPositionResponseDto, data);
  }

  @Patch(':dni')
  async assignJobPosition(
    @Param('dni') dni: string,
    @Body() body: PatchMedicalClientJobPositionRequestDto
  ): Promise<PatchMedicalClientJobPositionResponseDto> {
    const data = await this.service.assignJobPosition(dni, body);
    return plainToInstance(PatchMedicalClientJobPositionResponseDto, data);
  }
}
