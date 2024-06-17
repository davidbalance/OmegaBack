import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';

@Injectable()
export class PatientService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository) { }

  /**
   * Find all the active patients
   * @returns Array of patient
   */
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
      },
      cache: 1000 * 900
    });
    return patients;
  }

  async findByExtraAttribute(name: string, value: string): Promise<Patient[]> {
    const patients = await this.repository.find({
      where: {
        user: {
          extraAttributes: {
            name: name,
            value: value
          },
          status: true,
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
      },
      cache: 1000 * 900
    });
    return patients;
  }

  /**
   * Find one patient by its dni
   * @param dni 
   * @returns Patient
   */
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
      },
      cache: 1000 * 900
    });
    return patient;
  }
}
