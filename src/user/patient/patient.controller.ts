import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientRequestDTO, CreatePatientResponseDTO, FindOnePatientResponseDTO, FindPatientsResponseDTO, UpdatePatientRequestDTO, UpdatePatientResponseDTO } from '@/shared';

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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindOnePatientResponseDTO> {
    const patient = await this.patientService.findOne({ id });
    return { patient };
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: Omit<UpdatePatientRequestDTO, 'password'>
  ): Promise<UpdatePatientResponseDTO> {
    await this.patientService.findOneAndUpdate(id, body);
    return;
  }
}
