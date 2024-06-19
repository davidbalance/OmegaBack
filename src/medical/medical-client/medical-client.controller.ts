import { Controller, Get, Param, Inject, UseGuards, Delete } from '@nestjs/common';
import { MedicalClientService } from './medical-client.service';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DELETEMedicalEmailResponseDTO, GETMedicalEmailArrayResponseDto } from './dtos/medical-email.response.dto';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@Controller('medical/client')
export class MedicalClientController {
  constructor(
    @Inject(MedicalClientService) private readonly medicalClientService: MedicalClientService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get(':dni/email')
  async findEmailByDni(
    @Param('dni') dni: string
  ): Promise<GETMedicalEmailArrayResponseDto> {
    const email = await this.medicalClientService.findEmailByDni(dni);
    return plainToInstance(GETMedicalEmailArrayResponseDto, { email });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':dni/email/:id')
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
  ): Promise<DELETEMedicalEmailResponseDTO> {
    const email = await this.medicalClientService.deleteEmailById(id);
    return {}
  }
}
