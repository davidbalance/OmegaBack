import { Inject, Injectable } from '@nestjs/common';
import { MedicalClient } from '../entities/medical-client.entity';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { PatchMedicalClientJobPositionRequestDto } from '../dtos/request/patch.medical-client-job-position.request.dto';

@Injectable()
export class MedicalClientJobPositionService {

  constructor(
    @Inject(MedicalClientRepository) private readonly repository: MedicalClientRepository,
  ) { }

  async findOnePosition(dni: string): Promise<MedicalClient> {
    const client = await this.repository.findOne({ where: { dni } });
    return client;
  }

  async assignJobPosition(dni: string, data: PatchMedicalClientJobPositionRequestDto): Promise<MedicalClient> {
    const client = await this.repository.findOneAndUpdate({ dni: dni }, data);
    return client;
  }
}
