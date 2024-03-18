import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { Patient } from './entities/patient.entity';
import { UserCredentialService } from 'src/authentication/user-credential/user-credential.service';
import { UserService } from 'src/user/user.service';
import { CreatePatientAndAssignUserRequestDTO, CreatePatientRequestDTO, FindOrCreatePatientRequestDTO, UpdatePatientRequestDTO } from 'src/shared';
import { User } from 'src/user/entities/user.entity';

interface PatientServiceExtensions {
  /**
   * Creates a patient using the given values
   * @param patient 
   */
  create(patient: CreatePatientRequestDTO): Promise<Patient>;
  /**
   * Creates a patient using the given values
   * @param patient 
   * @param user 
   */
  create(patient: CreatePatientAndAssignUserRequestDTO, user: number): Promise<Patient>;
  /**
   * Find all the patients that have an active user
   */
  readAll(): Promise<Patient[]>;
  /**
   * Find one active patient
   * @param id 
   */
  readOneByID(id: number): Promise<Patient>;
  /**
   * Find one active patient
   * @param dni 
   */
  readOneByDNI(dni: string): Promise<Patient>;
  /**
   * Finds and updates a patient with the given values
   * @param id 
   * @param patient 
   */
  update(id: number, patient: UpdatePatientRequestDTO): Promise<Patient>;
  /**
   * Finds a patient if not exists create it without credentials
   * @param patient 
   */
  findOrCreatePatient(patient: FindOrCreatePatientRequestDTO): Promise<Patient>;
}

@Injectable()
export class PatientService implements PatientServiceExtensions {

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
      user = await this.userService.readOneByID(userOrUndefined);
    } else {
      user = await this.userService.create(patient as CreatePatientRequestDTO);
      await this.credentialService.create(patient as CreatePatientRequestDTO, user.id);
    }
    return await this.repository.create({ ...patient, user: user });
  }

  async readAll(): Promise<Patient[]> {
    return await this.repository.find({ user: { status: true } }, { user: true })
  }

  async readOneByID(id: number): Promise<Patient> {
    return await this.repository.findOne({ id, user: { status: true } }, { user: true })
  }

  async readOneByDNI(dni: string): Promise<Patient> {
    return await this.repository.findOne({ user: { dni: dni, status: true } }, { user: true });
  }

  async update(id: number, patient: UpdatePatientRequestDTO): Promise<Patient> {
    const currentPatient = await this.repository.findOne({ id }, { user: true });
    const user = await this.userService.update(currentPatient.user.id, patient);
    if (patient.email) {
      const credential = await this.credentialService.readByUser(currentPatient.user.id);
      if (credential.email !== patient.email) {
        await this.credentialService.updateUsername(credential.id, patient.email);
      }
    }
    currentPatient.user = user;
    return await this.repository.findOneAndUpdate({ id }, patient);
  }
}
