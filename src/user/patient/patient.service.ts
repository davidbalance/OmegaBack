import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { Patient } from './entities/patient.entity';
import { UserCredentialService } from 'src/authentication/user-credential/user-credential.service';
import { UserService } from 'src/user/user/user.service';
import { CreatePatientRequestDTO, FindOneOrCreateService, UpdatePatientRequestDTO } from 'src/shared';

type FindPatientParams = Omit<Patient, 'id' | 'status' | 'createAt' | 'updateAt' | 'user'> & { dni: string }

@Injectable()
export class PatientService
  implements FindOneOrCreateService<Patient> {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(UserCredentialService) private readonly credentialService: UserCredentialService,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async findOneOrCreate(filterOption: any, createOption: any): Promise<Patient> {
    const patientOptions = createOption as CreatePatientRequestDTO;
    const filter = filterOption as Partial<FindPatientParams & { id: number }>
    try {
      return await this.findOne(filter);
    } catch (error) {
      const user = await this.userService.create(patientOptions);
      const patient = await this.repository.create({ ...patientOptions, user: user });
      return patient;
    }
  }

  async create(createPatient: CreatePatientRequestDTO): Promise<Patient> {
    const user = await this.userService.create(createPatient);
    await this.credentialService.create(createPatient, user.id);
    const patient = await this.repository.create({ ...createPatient, user: user });
    return patient;
  }

  async find(params?: Partial<FindPatientParams>): Promise<Patient[]> {
    return await this.repository.find({ ...params, user: { dni: params.dni, status: true } }, { user: true })
  }

  async findOne(params?: Partial<FindPatientParams & { id: number }>): Promise<Patient> {
    return await this.repository.findOne({ ...params, user: { dni: params.dni } }, { user: true })
  }

  async update(id: number, patient: UpdatePatientRequestDTO): Promise<Patient> {
    const currentPatient = await this.repository.findOne({ id }, { user: true });
    const user = await this.userService.update(currentPatient.user.id, patient);
    if (patient.email) {
      const credential = await this.credentialService.findByUser(currentPatient.user.id);
      if (credential.email !== patient.email) {
        await this.credentialService.updateUsername(credential.id, patient.email);
      }
    }
    currentPatient.user = user;
    return await this.repository.findOneAndUpdate({ id }, patient);
  }
}
