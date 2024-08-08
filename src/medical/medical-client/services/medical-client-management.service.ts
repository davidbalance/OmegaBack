import { Inject, Injectable } from '@nestjs/common';
import { MedicalClient } from '../entities/medical-client.entity';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { PatchMedicalClientRequestDto } from '../dtos/request/patch.medical-client.request.dto';
import { PostMedicalClientRequestDto } from '../dtos/request/post.medical-client.request.dto';

@Injectable()
export class MedicalClientManagementService {

  constructor(
    @Inject(MedicalClientRepository) private readonly clientRepository: MedicalClientRepository,
  ) { }

  async create({ dni, email, ...data }: PostMedicalClientRequestDto): Promise<MedicalClient> {
    const client = await this.clientRepository.create({ ...data, dni });
    return client;
  }

  async findOne(id: number): Promise<MedicalClient> {
    const client = await this.clientRepository.findOne({ where: { id } });
    return client;
  }

  async findOneByDni(dni: string): Promise<MedicalClient> {
    const client = await this.clientRepository.findOne({ where: { dni } });
    return client;
  }

  async findClientsByDoctor(doctor: string): Promise<MedicalClient[]> {
    const clients = await this.clientRepository.query('client')
      .leftJoinAndSelect('client.medicalOrders', 'medicalOrder')
      .leftJoinAndSelect('medicalOrder.results', 'medicalResult')
      .where('medicalResult.doctorDni = :dni', { dni: doctor })
      .getMany();
    return clients;
  }

  async updateOne(dni: string, data: PatchMedicalClientRequestDto): Promise<MedicalClient> {
    return this.clientRepository.findOneAndUpdate({ dni }, data);
  }

  async deleteOne(dni: string): Promise<void> {
    await this.clientRepository.findOneAndDelete({ dni });
  }
}
