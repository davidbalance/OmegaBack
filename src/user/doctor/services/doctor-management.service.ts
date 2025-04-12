import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { Doctor } from '../entities/doctor.entity';
import { DoctorFlatService } from './doctor-flat.service';
import { DoctorResponseDto } from '../dtos/response/base.doctor.response.dto';

@Injectable()
export class DoctorManagementService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(DoctorFlatService) private readonly flatService: DoctorFlatService
  ) { }

  async find(): Promise<DoctorResponseDto[]> {
    const doctors = await this.repository.find({
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true, hasCredential: true }
      },
      cache: 1000 * 900
    });
    const flat = doctors.map(this.flatService.flat);
    return flat;
  }

  async findOne(id: number): Promise<DoctorResponseDto> {
    const doctor = await this.repository.findOne({
      where: { id: id },
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true }
      }
    });
    const flat = this.flatService.flat(doctor);
    return flat;
  }

  async findOneByDni(dni: string): Promise<DoctorResponseDto> {
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
    const flat = this.flatService.flat(doctor);
    return flat;
  }
}
