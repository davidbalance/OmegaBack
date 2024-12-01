import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { Doctor } from '../dtos/response/doctor.base.dto';

@Injectable()
export class DoctorOptionService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository
  ) { }

  async find(): Promise<Doctor[]> {
    const values = await this.repository.find({ where: { user: { status: true } } });
    return values.map(e => ({ ...e.user, ...e, user: e.user.id }));
  }

}
