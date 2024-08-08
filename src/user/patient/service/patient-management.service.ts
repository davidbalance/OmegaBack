import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../repositories/patient.repository';
import { PatientResponseDto } from '../dtos/response/base.patient.response.dto';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { INJECT_PATIENT_FLAT_SERVICE } from './patient-flat.service';
import { PatientRequestDto } from '../dtos/request/base.patient.request.dto';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { User } from '@/user/user/entities/user.entity';
import { PatchPatientRequestDto } from '../dtos/request/patch.patient.request.dto';

@Injectable()
export class PatientManagementService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(UserManagementService) private readonly userService: UserManagementService,
    @Inject(INJECT_PATIENT_FLAT_SERVICE) private readonly flatService: FlatService<Patient, PatientResponseDto>
  ) { }

  async create({ birthday, gender, role, ...data }: PatientRequestDto): Promise<PatientResponseDto> {
    let user: User | undefined = undefined;
    try {
      user = await this.userService.findOneByDni(data.dni);
    } catch (error) {
      user = await this.userService.create({ ...data, role, email: null });
    }
    const patient = await this.repository.create({ birthday, gender, user: user });
    const flatPatient = this.flatService.flat(patient);
    return flatPatient;
  }

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

  async updateOne(dni: string, { birthday, gender, ...data }: PatchPatientRequestDto): Promise<PatientResponseDto> {
    const patient = await this.repository.findOne({ where: { user: { dni: dni } }, relations: { user: true } });
    const { user } = patient;
    const updatedUser = await this.userService.updateOne(user.id, { ...user, email: null });
    const updatedPatient = await this.repository.findOneAndUpdate({ user: { dni: dni } }, { birthday, gender });
    updatedPatient.user = updatedUser;
    const flatPatient = this.flatService.flat(updatedPatient);
    return flatPatient;
  }
}
