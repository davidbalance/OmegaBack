import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientRequestDTO, CreatePatientResponseDTO, FindPatientsResponseDTO, FindOnePatientResponseDTO, FindOnePatientAndUpdateRequestDTO, FindOnePatientAndUpdateResponseDTO } from '../common';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  async create(
    @Body() body: CreatePatientRequestDTO
  ): Promise<CreatePatientResponseDTO> {
    await this.patientService.create(body);
    return;
  }

  @Get()
  async find(): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.find();
    return { patients };
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOnePatientAndUpdateRequestDTO
  ): Promise<FindOnePatientAndUpdateResponseDTO> {
    await this.patientService.findOneAndUpdate(id, body);
    return;
  }
}
