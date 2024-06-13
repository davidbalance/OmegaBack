import { Controller, Get, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { FindPatientsResponseDTO } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.find();
    return plainToInstance(FindPatientsResponseDTO, { patients });
  }
}
