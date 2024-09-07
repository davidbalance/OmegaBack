import { Inject, Injectable } from '@nestjs/common';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { PatchMedicalClientJobPositionRequestDto } from '../dtos/request/medical-client-job-position.patch.dto';
import { MedicalClientJobPosition } from '../dtos/response/medical-client-job-position.base.dto';

@Injectable()
export class MedicalClientJobPositionService {

  constructor(
    @Inject(MedicalClientRepository) private readonly repository: MedicalClientRepository,
  ) { }

  async findOnePosition(dni: string): Promise<MedicalClientJobPosition> {
    const client = await this.repository.findOne({ where: { dni } });
    return client;
  }

  async assignJobPosition(dni: string, data: PatchMedicalClientJobPositionRequestDto): Promise<MedicalClientJobPosition> {
    const client = await this.repository.findOneAndUpdate({ dni: dni }, data);
    return client;
  }
}
