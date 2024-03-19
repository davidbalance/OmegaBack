import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { Patient } from './entities/patient.entity';
import { UserCredentialService } from 'src/authentication/user-credential/user-credential.service';
import { UserService } from 'src/user/user/user.service';
import { CreatePatientAndAssignUserRequestDTO, CreatePatientRequestDTO, FindOrCreatePatientRequestDTO, UpdatePatientRequestDTO } from 'src/shared';
import { User } from 'src/user/user/entities/user.entity';

@Injectable()
export class PatientService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(UserCredentialService) private readonly credentialService: UserCredentialService,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async findOrCreatePatient(patient: FindOrCreatePatientRequestDTO): Promise<Patient> {
    try {
      let retrivedPatient = await this.repository.findOne({ user: { dni: patient.dni } });
      return retrivedPatient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.create(patient);
        return await this.repository.create({ ...patient, user: user });
      } else {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  create(patient: CreatePatientRequestDTO): Promise<Patient>;
  create(patient: CreatePatientAndAssignUserRequestDTO, user: number): Promise<Patient>;
  async create(patient: CreatePatientRequestDTO | CreatePatientAndAssignUserRequestDTO, userOrUndefined?: number): Promise<Patient> {
    let user: User = null;
    if (userOrUndefined) {
      user = await this.userService.findOneByID(userOrUndefined);
    } else {
      user = await this.userService.create(patient as CreatePatientRequestDTO);
      await this.credentialService.create(patient as CreatePatientRequestDTO, user.id);
    }
    return await this.repository.create({ ...patient, user: user });
  }

  async findAll(): Promise<Patient[]> {
    return await this.repository.find({ user: { status: true } }, { user: true })
  }

  async findOneByID(id: number): Promise<Patient> {
    return await this.repository.findOne({ id, user: { status: true } }, { user: true })
  }

  async findOneByDNI(dni: string): Promise<Patient> {
    return await this.repository.findOne({ user: { dni: dni, status: true } }, { user: true });
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
