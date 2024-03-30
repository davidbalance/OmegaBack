import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  CreatePatientRequestDTO,
  CreatePatientResponseDTO,
  FindPatientsResponseDTO,
  FindOnePatientAndUpdateRequestDTO,
  FindOnePatientAndUpdateResponseDTO
} from '../common';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Get()
  async find(): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.find();
    return { patients };
  }

  @Post()
  async create(
    @Body() body: CreatePatientRequestDTO
  ): Promise<CreatePatientResponseDTO> {
    await this.patientService.create(body);
    return;
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
