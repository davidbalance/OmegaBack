import { Controller, Get, Param, Inject, UseGuards, Delete, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MedicalClientLocationService } from '../services/medical-client-location.service';
import { MedicalClientManagementService } from '../services/medical-client-management.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetMedicalClientManagementAreaResponseDto } from '../dtos/response/medical-client-management-area.get.dto';
import { PatchMedicalClientManagementAreaRequestDto } from '../dtos/request/medical-client-management-area.patch.dto';

@ApiTags('Medical>Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client/management/area')
export class MedicalClientLocationController {
  constructor(
    @Inject(MedicalClientLocationService) private readonly service: MedicalClientLocationService,
    @Inject(MedicalClientManagementService) private readonly clientService: MedicalClientManagementService,
  ) { }

  @Get(':dni')
  async findOneClientByDniAndReturnManagementAndArea(
    @Param('dni') dni: string
  ): Promise<GetMedicalClientManagementAreaResponseDto> {
    const data = await this.clientService.findOneByDni(dni);
    return plainToInstance(GetMedicalClientManagementAreaResponseDto, data);
  }

  @Post(':dni')
  async assignManagementAndArea(
    @Param('dni') dni: string,
    @Body() body: PatchMedicalClientManagementAreaRequestDto
  ): Promise<any> {
    await this.service.assignManagementAndArea(dni, body);
    return {}
  }
}
