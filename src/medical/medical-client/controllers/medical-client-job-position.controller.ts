import { Controller, Get, Param, Inject, UseGuards, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MedicalClientJobPositionService } from '../services/medical-client-job-position.service';
import { GetMedicalClientJobPositionResponseDto } from '../dtos/response/medical-client-job-position.get.dto';
import { PatchMedicalClientJobPositionRequestDto } from '../dtos/request/medical-client-job-position.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

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
  ): Promise<any> {
    await this.service.assignJobPosition(dni, body);
    return {}
  }
}
