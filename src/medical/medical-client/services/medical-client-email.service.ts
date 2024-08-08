import { Inject, Injectable } from '@nestjs/common';
import { MedicalEmail } from '../entities/medical-email.entity';
import { MedicalEmailRepository } from '../repositories/medical-email.repository';
import { PostMedicalEmailRequestDto } from '../dtos/request/post.medical-email.request.dto';
import { MedicalClientManagementService } from './medical-client-management.service';

@Injectable()
export class MedicalClientEmailService {

  constructor(
    @Inject(MedicalClientManagementService) private readonly clientService: MedicalClientManagementService,
    @Inject(MedicalEmailRepository) private readonly emailRepository: MedicalEmailRepository
  ) { }

  async findAllByDni(dni: string): Promise<MedicalEmail[]> {
    const email = await this.emailRepository.find({ where: { client: { dni } } });
    return email;
  }

  async assignEmail(dni: string, { ...data }: PostMedicalEmailRequestDto): Promise<MedicalEmail> {
    const medicalClient = await this.clientService.findOneByDni(dni);
    const newEmail = await this.emailRepository.create({ ...data, client: medicalClient });
    return newEmail;
  }

  async updateEmailDefault(id: number): Promise<MedicalEmail> {
    const currentEmail = await this.emailRepository.findOne({ where: { id }, relations: { client: true } });
    const currentClient = await this.clientService.findOne(currentEmail.client.id);
    const ids = currentClient.email.map(e => e.id);
    for (const oldId of ids) {
      await this.emailRepository.findOneAndUpdate({ id: oldId }, { default: false });
    }
    const email = await this.emailRepository.findOneAndUpdate({ id }, { default: true });
    return email;
  }

  async deleteOne(id: number): Promise<void> {
    await this.emailRepository.findOneAndDelete({ id });
  }
}
