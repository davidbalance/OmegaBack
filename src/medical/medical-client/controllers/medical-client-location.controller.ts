import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Controller, Get, Param, Inject, UseGuards, Delete, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MedicalClientService } from '../services/medical-client.service';
import { GetMedicalClientManagementAreaResponseDto } from '../dtos/response/get.medical-client-management-area.response.dto';
import { PostMedicalClientManagementAndAreaRequestDto } from '../dtos/request/post.medical-client-management-area.request.dto';
import { PostMedicalClientManagementAreaResponseDto } from '../dtos/response/post.medical-client-management-area.response.dto';
import { DeleteMedicalClientManagementAreaResponseDto } from '../dtos/response/delete.medical-client-management-area.response.dto';
import { MedicalClientLocationService } from '../services/medical-client-location.service';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client/management/area')
export class MedicalClientLocationController {
  constructor(
    @Inject(MedicalClientLocationService) private readonly service: MedicalClientLocationService,
    @Inject(MedicalClientService) private readonly clientService: MedicalClientService,
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
    @Body() body: PostMedicalClientManagementAndAreaRequestDto
  ): Promise<PostMedicalClientManagementAreaResponseDto> {
    const data = await this.service.assignManagementAndArea(dni, body);
    return plainToInstance(PostMedicalClientManagementAreaResponseDto, data);
  }

  @Delete(':dni')
  async removeManagementAndArea(
    @Param('dni') dni: string
  ): Promise<DeleteMedicalClientManagementAreaResponseDto> {
    await this.service.removeManagementAndArea(dni);
    return {}
  }
}
