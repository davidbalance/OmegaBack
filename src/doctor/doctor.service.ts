import { Inject, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository
  ) { }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.repository.create(createDoctorDto);
  }

  async findAll(): Promise<Doctor[]> {
    return await this.repository.find({});
  }

  async findOne(id: number): Promise<Doctor> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return await this.repository.findOneAndUpdate({ id }, updateDoctorDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
