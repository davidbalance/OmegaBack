import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PatientRequestDto } from '../dtos/request/patient.base.dto';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { PatchPatientRequestDto } from '../dtos/request/patient.patch.dto';
import { PatientRepository } from '../repositories/patient.repository';
import { Patient } from '../dtos/response/patient.base.dto';
import { User } from '@/user/user/dtos/response/user.base.dto';

@Injectable()
export class PatientManagementService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(UserManagementService) private readonly userService: UserManagementService,
  ) { }

  async create({ birthday, gender, role, ...data }: PatientRequestDto): Promise<Patient> {
    let currentUser: User | undefined = undefined;
    try {
      currentUser = await this.userService.findOneByDni(data.dni);
    } catch (error) {
      currentUser = await this.userService.create({ ...data, role, email: null });
    }
    const { user, ...patient } = await this.repository.create({ birthday, gender, user: { dni: currentUser.dni } });
    return { ...user, ...patient, user: user.id };
  }

  async findByExtraAttribute(name: string, value: string): Promise<Patient[]> {
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
    const flatPatients = patients.map(({ user, ...data }) => ({ ...user, ...data, user: user.id }));
    return flatPatients;
  }

  async findOneByDni(dni: string): Promise<Patient> {
    const { user, ...patient } = await this.repository.findOne({
      where: {
        user: { dni: dni }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: { id: true, dni: true, email: true, lastname: true, name: true }
      }
    });
    return { ...user, ...patient, user: user.id };
  }

  async updateOne(dni: string, { birthday, gender, ...data }: PatchPatientRequestDto): Promise<Patient> {
    const patient = await this.repository.findOne({ where: { user: { dni: dni } }, relations: { user: true } });
    const { user } = patient;
    const updatedUser = await this.userService.updateOne(user.id, { ...data, email: null });
    const updatedPatient = await this.repository.findOneAndUpdate({ user: { dni: dni } }, { birthday, gender });
    return { ...updatedUser, ...updatedPatient, user: updatedUser.id };
  }
}
