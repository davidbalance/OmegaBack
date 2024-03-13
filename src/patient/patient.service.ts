import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './patient.repository';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository
  ) { }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.repository.create(createPatientDto);
  }

  async readAll(): Promise<Patient[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<Patient> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    return await this.repository.findOneAndUpdate({ id }, updatePatientDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
