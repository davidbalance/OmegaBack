import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { PatientResponseDto } from '../dtos/response/base.patient.response.dto';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { INJECT_PATIENT_FLAT_SERVICE } from './patient-flat.service';

@Injectable()
export class PatientManagementService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(INJECT_PATIENT_FLAT_SERVICE) private readonly flatService: FlatService<Patient, PatientResponseDto>
  ) { }

  async find(): Promise<PatientResponseDto[]> {
    const patients = await this.repository.find({
      where: {
        user: { status: true }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: { id: true, dni: true, email: true, lastname: true, name: true }
      },
      cache: 1000 * 900
    });
    const flatPatients = patients.map(this.flatService.flat);
    return flatPatients;
  }

  async findByExtraAttribute(name: string, value: string): Promise<PatientResponseDto[]> {
    const patients = await this.repository.find({
      where: {
        user: {
          extraAttributes: { name: name, value: value },
          status: true,
        }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: { id: true, dni: true, email: true, lastname: true, name: true }
      },
    });
    const flatPatients = patients.map(this.flatService.flat);
    return flatPatients;
  }

  async findOneByDni(dni: string): Promise<PatientResponseDto> {
    const patient = await this.repository.findOne({
      where: {
        user: { dni: dni }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: { id: true, dni: true, email: true, lastname: true, name: true }
      },
      cache: 1000 * 900
    });
    const flatPatient = this.flatService.flat(patient);
    return flatPatient;
  }
}
