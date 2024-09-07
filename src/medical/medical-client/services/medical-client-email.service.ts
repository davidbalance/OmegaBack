import { Inject, Injectable } from '@nestjs/common';
import { MedicalEmailRepository } from '../repositories/medical-email.repository';
import { PostMedicalEmailRequestDto } from '../dtos/request/medical-email.post.dto';
import { MedicalClientManagementService } from './medical-client-management.service';
import { MedicalEmail } from '../dtos/response/medical-email.base.dto';

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
    const { id: client } = await this.clientService.findOneByDni(dni);
    const newEmail = await this.emailRepository.create({ ...data, client: { id: client } });
    return newEmail;
  }

  async updateEmailDefault(id: number): Promise<MedicalEmail> {
    const currentEmail = await this.emailRepository.findOne({ where: { id }, relations: { client: true } });
    const currentClient = await this.clientService.findOne(currentEmail.client.id);
    const email = await this.emailRepository.find({ where: { client: { dni: currentClient.dni } } });
    const ids = email.map(e => e.id);
    for (const oldId of ids) {
      await this.emailRepository.findOneAndUpdate({ id: oldId }, { default: false });
    }
    const updatedEmail = await this.emailRepository.findOneAndUpdate({ id }, { default: true });
    return updatedEmail;
  }

  async deleteOne(id: number): Promise<void> {
    await this.emailRepository.findOneAndDelete({ id });
  }
}
