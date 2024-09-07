import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { UserManagementService } from '@/user/user/services/user-management.service';
import { PostDoctorRequestDto } from '../dtos/request/doctor.post.dto';
import { PatchDoctorRequestDto } from '../dtos/request/doctor.patch.dto';
import { Doctor } from '../dtos/response/doctor.base.dto';

@Injectable()
export class DoctorManagementService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(UserManagementService) private readonly userService: UserManagementService,
  ) { }

  async create(data: PostDoctorRequestDto): Promise<Doctor> {
    let foundUser;
    try {
      foundUser = await this.userService.findOneByDni(data.dni);
    } catch (error) {
      foundUser = await this.userService.create(data);
    }
    const { user, ...doctor } = await this.repository.create({ user: foundUser });
    return { ...user, ...doctor, user: user.id };
  }

  async findOne(id: number): Promise<Doctor> {
    const { user, ...doctor } = await this.repository.findOne({
      where: { id: id },
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true }
      }
    });
    return { ...user, ...doctor, user: user.id };
  }

  async findOneByDni(dni: string): Promise<Doctor> {
    const { user, ...doctor } = await this.repository.findOne({
      where: {
        user: { dni: dni }
      },
      select: {
        id: true,
        hasFile: true,
        user: { id: true, dni: true, email: true, name: true, lastname: true }
      }
    });
    return { ...user, ...doctor, user: user.id };
  }

  async updateOneByDni(dni: string, data: PatchDoctorRequestDto): Promise<Doctor> {
    const doctor = await this.repository.findOne({ where: { user: { dni } } });
    const user = await this.userService.updateOne(doctor.user.id, data);
    return { ...user, ...doctor, user: user.id };
  }
}
