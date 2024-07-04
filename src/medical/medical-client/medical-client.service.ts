import { Inject, Injectable } from '@nestjs/common';
import { MedicalClientRepository } from './repositories/medical-client.repository';
import { MedicalEmailRepository } from './repositories/medical-email.repository';
import { MedicalClient } from './entities/medical-client.entity';
import { POSTMedicalClientRequestDto } from './dtos/medical-client.request.dto';
import { POSTMedicalEmailRequestDto } from './dtos/medical-email.request.dto';
import { MedicalEmail } from './entities/medical-email.entity';
import { In } from 'typeorm';

@Injectable()
export class MedicalClientService {

  constructor(
    @Inject(MedicalClientRepository) private readonly clientRepository: MedicalClientRepository,
    @Inject(MedicalEmailRepository) private readonly emailRepository: MedicalEmailRepository
  ) { }

  async findOneOrCreate({ dni, email, ...data }: POSTMedicalClientRequestDto): Promise<MedicalClient> {
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
    const clients = await this.clientRepository.createQuery('client')
      .leftJoinAndSelect('client.medicalOrders', 'medicalOrder')
      .leftJoinAndSelect('medicalOrder.results', 'medicalResult')
      .where('medicalResult.doctorDni = :dni', { dni: doctor })
      .getMany();
    return clients;
  }

  async findEmailByDni(dni: string): Promise<MedicalEmail[]> {
    const client = await this.clientRepository.findOne({
      where: {
        dni: dni
      }
    });
    return client.email;
  }

  async updateEmailDefault(dni: string, id: number): Promise<MedicalEmail[]> {
    const { email } = await this.clientRepository.findOne({ where: { dni } });
    await this.emailRepository.findOneAndUpdate({ id: In(email.map(e => e.id)) }, { default: false });
    await this.emailRepository.findOneAndUpdate({ id: id }, { default: true });
    const client = await this.clientRepository.findOne({ where: { dni } });
    return client.email;
  }

  deleteEmailById(id: number): void {
    this.emailRepository.findOneAndDelete({ id });
  }

  async assignEmail(id: number, { ...data }: POSTMedicalEmailRequestDto): Promise<MedicalClient> {
    const newEmail = await this.emailRepository.create({ ...data });
    const { email } = await this.clientRepository.findOne({ where: { id } });
    const client = await this.clientRepository.findOneAndUpdate({ id }, { email: [...email, newEmail] });
    return client;
  }
}
