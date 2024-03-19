import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientAndAssignUserRequestDTO, CreatePatientRequestDTO, UpdatePatientRequestDTO } from 'src/shared';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  async create(
    @Body() body: CreatePatientRequestDTO
  ): Promise<void> {
    await this.patientService.create(body);
  }

  @Post('assign')
  async assignUser(
    @Body() body: CreatePatientAndAssignUserRequestDTO
  ): Promise<void> {
    await this.patientService.create(body, body.user);
  }

  @Get()
  async readAll(): Promise<Patient[]> {
    return await this.patientService.readAll();
  }

  @Get('patient/:id')
  async readOneByID(
    @Param('id') id: number
  ): Promise<Patient> {
    return await this.patientService.readOneByID(id);
  }

  @Patch('patient/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdatePatientRequestDTO
  ): Promise<void> {
    await this.patientService.update(id, body);
  }

}
