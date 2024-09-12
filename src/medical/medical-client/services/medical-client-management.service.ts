import { Inject, Injectable } from '@nestjs/common';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { PatchMedicalClientRequestDto } from '../dtos/request/medical-client.patch.dto';
import { PostMedicalClientRequestDto } from '../dtos/request/medical-client.post.dto';
import { MedicalClient } from '../dtos/response/medical-client.base.dto';

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

  async updateOne(dni: string, data: PatchMedicalClientRequestDto): Promise<MedicalClient> {
    return this.clientRepository.findOneAndUpdate({ dni }, data);
  }

  async deleteOne(dni: string): Promise<void> {
    await this.clientRepository.findOneAndDelete({ dni });
  }
}
