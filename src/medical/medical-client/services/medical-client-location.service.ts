import { Inject, Injectable } from '@nestjs/common';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { MedicalClientManagementAreaRequestDto } from '../dtos/request/medical-client-management-area.base.dto';
import { MedicalClientManagementArea } from '../dtos/response/medical-client-management-area.base.dto';

@Injectable()
export class MedicalClientLocationService {

  constructor(
    @Inject(MedicalClientRepository) private readonly repository: MedicalClientRepository,
  ) { }

  async assignManagementAndArea(dni: string, newLocation: MedicalClientManagementAreaRequestDto): Promise<MedicalClientManagementArea> {
    const client = await this.repository.findOneAndUpdate({ dni: dni }, { ...newLocation });
    return client;
  }
}
