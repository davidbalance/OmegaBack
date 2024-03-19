import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientAndAssignUserRequestDTO, CreatePatientRequestDTO, UpdatePatientRequestDTO } from 'src/shared';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }
}
