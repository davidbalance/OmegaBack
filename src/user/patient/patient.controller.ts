import {
  Controller,
  Get
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  FindPatientsResponseDTO
} from '../common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('User')  
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Get()
  async find(): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.find();
    return plainToInstance(FindPatientsResponseDTO, { patients });
  }
}
