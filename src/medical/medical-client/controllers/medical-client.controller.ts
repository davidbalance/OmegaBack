import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { Controller, Get, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MedicalClientService } from '../services/medical-client.service';
import { GetMedicalClientArrayResponseDto } from '../dtos/response/get.medical-client-array.response.dto';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client')
export class MedicalClientController {
  constructor(
    @Inject(MedicalClientService) private readonly medicalClientService: MedicalClientService
  ) { }

  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findMedicalClientsByDoctorDni(
    @User() doctor: string
  ): Promise<GetMedicalClientArrayResponseDto> {
    const data = await this.medicalClientService.findClientsByDoctor(doctor);
    return plainToInstance(GetMedicalClientArrayResponseDto, { data });
  }
}
