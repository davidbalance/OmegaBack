import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';

@Injectable()
export class PatientManagementService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository
  ) { }

  async find(): Promise<Patient[]> {
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
    return patients;
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
      cache: 1000 * 900
    });
    return patients;
  }

  async findOneByDni(dni: string): Promise<Patient> {
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
    return patient;
  }
}
