import { Inject, Injectable } from '@nestjs/common';
import { MedicalClient } from '../entities/medical-client.entity';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { MedicalEmailRepository } from '../repositories/medical-email.repository';
import { PostMedicalClientRequestDto } from '../dtos/request/post.medical-client.request.dto';
import { MedicalClientEventService } from './medical-client-event.service';

@Injectable()
export class MedicalClientService {

  constructor(
    @Inject(MedicalClientRepository) private readonly clientRepository: MedicalClientRepository,
    @Inject(MedicalEmailRepository) private readonly emailRepository: MedicalEmailRepository,
    @Inject(MedicalClientEventService) private readonly eventService: MedicalClientEventService
  ) { }

  async findOne(id: number): Promise<MedicalClient> {
    const client = await this.clientRepository.findOne({ where: { id } });
    return client;
  }

  async findOneByDni(dni: string): Promise<MedicalClient> {
    const client = await this.clientRepository.findOne({ where: { dni } });
    return client;
  }

  async findOneOrCreateWithSource(source: string, { dni, email, jobPosition, ...data }: PostMedicalClientRequestDto): Promise<MedicalClient> {
    try {
      const client = await this.clientRepository.findOne({
        where: {
          dni: dni
        }
      });
      return client;
    } catch (error) {

      const newClient = await this.clientRepository.create({
        ...data,
        dni,
        jobPositionName: jobPosition.name
      });
      await this.emailRepository.create({ email, default: false, client: newClient });
      this.eventService.emitMedicalClientCreateEvent(source, jobPosition)
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
