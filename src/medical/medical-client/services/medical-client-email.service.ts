import { Inject, Injectable } from '@nestjs/common';
import { MedicalEmail } from '../entities/medical-email.entity';
import { MedicalEmailRepository } from '../repositories/medical-email.repository';
import { PostMedicalEmailRequestDto } from '../dtos/request/post.medical-email.request.dto';
import { MedicalClientService } from './medical-client.service';

@Injectable()
export class MedicalClientEmailService {

  constructor(
    @Inject(MedicalClientService) private readonly clientService: MedicalClientService,
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
    const email = await this.emailRepository.findOne({ where: { id } });
    return email;
  }

  async deleteOne(id: number): Promise<void> {
    await this.emailRepository.findOneAndDelete({ id });
  }
}
