import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { Patient } from './entities/patient.entity';
import { UserService } from 'src/user/user/user.service';
import { FindOnePatientAndUpdateRequestDTO } from '../common';

@Injectable()
export class PatientService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async find(): Promise<Patient[]> {
    const patients = await this.repository.find({
      where: {
        user: {
          status: true
        }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: {
          id: true,
          dni: true,
          email: true,
          lastname: true,
          name: true
        }
      }
    });
    return patients;
  }


  async findOneByDni(dni: string): Promise<Patient> {
    const patient = await this.repository.findOne({
      where: {
        user: {
          dni: dni
        }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: {
          id: true,
          dni: true,
          email: true,
          lastname: true,
          name: true
        }
      }
    });
    return patient;
  }
}
