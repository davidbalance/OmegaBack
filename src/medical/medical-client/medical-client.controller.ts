import { Controller, Get, Param, Inject, UseGuards, Delete, Patch, Body, Post, UseInterceptors } from '@nestjs/common';
import { MedicalClientService } from './medical-client.service';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DELETEMedicalEmailResponseDto, GETMedicalEmailArrayResponseDto, POSTMedicalEmailResponseDto } from './dtos/medical-email.response.dto';
import { POSTMedicalEmailRequestDto } from './dtos/medical-email.request.dto';
import { DELETEMedicalClientManagementAreaResponseDto, GETMedicalClientArrayResponseDto, GETMedicalClientManagementAreaResponseDto, POSTMedicalClientManagementAreaResponseDto } from './dtos/medical-client.response.dto';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { User } from '@/shared/decorator';
import { POSTMedicalClientManagementAndAreaRequestDto } from './dtos/medical-client.request.dto';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@Controller('medical/client')
export class MedicalClientController {
  constructor(
    @Inject(MedicalClientService) private readonly medicalClientService: MedicalClientService
  ) { }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findMedicalClientsByDoctorDni(
    @User() doctor: string
  ): Promise<GETMedicalClientArrayResponseDto> {
    const clients = await this.medicalClientService.findClientsByDoctor(doctor);
    return plainToInstance(GETMedicalClientArrayResponseDto, { clients });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':dni/email')
  async findEmailByDni(
    @Param('dni') dni: string
  ): Promise<GETMedicalEmailArrayResponseDto> {
    const email = await this.medicalClientService.findEmailByDni(dni);
    return plainToInstance(GETMedicalEmailArrayResponseDto, { email });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':dni/management/area')
  async findOneClientByDniAndReturnManagementAndArea(
    @Param('dni') dni: string
  ): Promise<GETMedicalClientManagementAreaResponseDto> {
    const data = await this.medicalClientService.findOneClientByDniAndReturnManagementAndArea(dni);
    return plainToInstance(GETMedicalClientManagementAreaResponseDto, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dni/management/area')
  async findOneClientByDniAndAssignManagementAndArea(
    @Param('dni') dni: string,
    @Body() body: POSTMedicalClientManagementAndAreaRequestDto
  ): Promise<POSTMedicalClientManagementAreaResponseDto> {
    const data = await this.medicalClientService.findOneClientByDniAndAssignManagementAndArea(dni, body);
    return plainToInstance(POSTMedicalClientManagementAreaResponseDto, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dni/management/area')
  async findOneClientByDniAndRemoveManagementAndArea(
    @Param('dni') dni: string
  ): Promise<DELETEMedicalClientManagementAreaResponseDto> {
    await this.medicalClientService.findOneClientByDniAndRemoveManagementAndArea(dni);
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dni/email')
  async createEmail(
    @Param('id') id: number,
    @Body() body: POSTMedicalEmailRequestDto
  ): Promise<POSTMedicalEmailResponseDto> {
    const { email } = await this.medicalClientService.assignEmail(id, body);
    return plainToInstance(POSTMedicalEmailResponseDto, { email });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':dni/email/:id')
  async updateEmailDefault(
    @Param('id') id: number,
    @Param('dni') dni: string,
  ): Promise<GETMedicalEmailArrayResponseDto> {
    const email = await this.medicalClientService.updateEmailDefault(dni, id);
    return plainToInstance(GETMedicalEmailArrayResponseDto, { email });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('email/:id')
  async deleteEmailById(
    @Param('id') id: number
  ): Promise<DELETEMedicalEmailResponseDto> {
    const email = await this.medicalClientService.deleteEmailById(id);
    return {}
  }
}
