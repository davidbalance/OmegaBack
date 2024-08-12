import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';
import { Controller, Get, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetMedicalClientArrayResponseDto } from '../dtos/response/get.medical-client-array.response.dto';
import { MedicalClientManagementService } from '../services/medical-client-management.service';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client')
export class MedicalClientManagementController {
  constructor(
    @Inject(MedicalClientManagementService) private readonly service: MedicalClientManagementService
  ) { }

  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findMedicalClientsByDoctorDni(
    @User() doctor: string
  ): Promise<GetMedicalClientArrayResponseDto> {
    const data = await this.service.findClientsByDoctor(doctor);
    return plainToInstance(GetMedicalClientArrayResponseDto, { data });
  }
}
