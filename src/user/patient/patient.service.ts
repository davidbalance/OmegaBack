import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { Patient } from './entities/patient.entity';
import { UserService } from 'src/user/user/user.service';
import { CreatePatientRequestDTO, FindOnePatientAndUpdateRequestDTO, FindPatient } from '../common';

@Injectable()
export class PatientService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async create({ age, birthday, gender, ...data }: CreatePatientRequestDTO): Promise<Patient> {
    const user = await this.userService.create(data);
    const patient = await this.repository.create({ age, birthday, gender, user });
    return patient;
  }

  async find(): Promise<FindPatient[]> {
    const patients = await this.repository.find({
      where: {
        user: {
          status: true
        }
      },
      select: {
        age: true,
        id: true,
        birthday: true,
        gender: true,
        user: {
          dni: true,
          email: true,
          lastname: true,
          name: true
        }
      }
    });

    const foundPatients: FindPatient[] = patients.map((e) => ({ ...e.user, ...e }));
    return foundPatients;
  }

  async findOneAndUpdate(id: number, { age, birthday, gender, ...data }: FindOnePatientAndUpdateRequestDTO): Promise<FindPatient> {
    const patient = await this.repository.findOne({ where: { id }, select: { user: { id: true } } });
    const user = await this.userService.findOneAndUpdate(patient.user.id, data);
    const updatedPatient = await this.repository.findOneAndUpdate({ id }, patient);
    const findPatient = { ...user, ...updatedPatient }
    return findPatient;
  }
}
