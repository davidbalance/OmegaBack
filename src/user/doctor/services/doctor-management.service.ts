import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from '../doctor.repository';
import { Doctor } from '../entities/doctor.entity';


@Injectable()
export class DoctorManagementService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository
  ) { }

  async find(): Promise<Doctor[]> {
    const doctors = await this.repository.find({
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true, hasCredential: true }
      },
      cache: 1000 * 900
    });
    return doctors;
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.repository.findOne({
      where: { id: id },
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true }
      }
    });
    return doctor;
  }

  async findOneByDni(dni: string): Promise<Doctor> {
    const doctor = await this.repository.findOne({
      where: {
        user: { dni: dni }
      },
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true }
      }
    });
    return doctor;
  }
}
