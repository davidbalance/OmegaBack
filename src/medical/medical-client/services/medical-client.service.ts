import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { MedicalClient } from '../entities/medical-client.entity';
import { MedicalEmail } from '../entities/medical-email.entity';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { MedicalEmailRepository } from '../repositories/medical-email.repository';
import { PostMedicalClientRequestDto } from '../dtos/request/post.medical-client.request.dto';
import { PostMedicalClientManagementAndAreaRequestDto } from '../dtos/request/post.medical-client-management-area.request.dto';
import { PostMedicalEmailRequestDto } from '../dtos/request/post.medical-email.request.dto';

@Injectable()
export class MedicalClientService {

  constructor(
    @Inject(MedicalClientRepository) private readonly clientRepository: MedicalClientRepository,
    @Inject(MedicalEmailRepository) private readonly emailRepository: MedicalEmailRepository
  ) { }

  async findOne(id: number): Promise<MedicalClient> {
    const client = await this.clientRepository.findOne({ where: { id } });
    return client;
  }

  async findOneByDni(dni: string): Promise<MedicalClient> {
    const client = await this.clientRepository.findOne({ where: { dni } });
    return client;
  }

  async findOneOrCreate({ dni, email, ...data }: PostMedicalClientRequestDto): Promise<MedicalClient> {
    try {
      const client = await this.clientRepository.findOne({
        where: {
          dni: dni
        }
      });
      return client;
    } catch (error) {
      const newEmail = await this.emailRepository.create({ email, default: false });
      const newClient = await this.clientRepository.create({ ...data, dni, email: [newEmail] });
      return newClient;
    }
  }

  async findClientsByDoctor(doctor: string): Promise<MedicalClient[]> {
    const clients = await this.clientRepository.query('client')
      .leftJoinAndSelect('client.medicalOrders', 'medicalOrder')
      .leftJoinAndSelect('medicalOrder.results', 'medicalResult')
      .where('medicalResult.doctorDni = :dni', { dni: doctor })
      .getMany();
    return clients;
  }
}
