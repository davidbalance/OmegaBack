import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorFlatService } from './doctor-flat.service';
import { DoctorResponseDto } from '../dtos/response/base.doctor.response.dto';
import { UserManagementService } from '@/user/user/services/user-management.service';
import { PostDoctorRequestDto } from '../dtos/request/post.doctor.dto';
import { PatchDoctorRequestDto } from '../dtos/request/patch.doctor.request.dto';
import { User } from '@/user/user/entities/user.entity';

@Injectable()
export class DoctorManagementService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(DoctorFlatService) private readonly flatService: DoctorFlatService,
    @Inject(UserManagementService) private readonly userService: UserManagementService,
  ) { }

  async create(data: PostDoctorRequestDto): Promise<DoctorResponseDto> {
    let foundUser: User;
    try {
      foundUser = await this.userService.findOneByDni(data.dni);
    } catch (error) {
      foundUser = await this.userService.create(data);
    }
    const doctor = await this.repository.create({ user: foundUser });
    const flat = this.flatService.flat(doctor);
    return flat;
  }

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

  async updateOneByDni(dni: string, data: PatchDoctorRequestDto): Promise<DoctorResponseDto> {
    const doctor = await this.repository.findOne({ where: { user: { dni } } });
    const user = await this.userService.updateOne(doctor.user.id, data);
    doctor.user = user;
    const flat = this.flatService.flat(doctor);
    return flat;
  }
}
