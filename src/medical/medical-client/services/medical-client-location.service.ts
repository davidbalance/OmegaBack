import { Inject, Injectable } from '@nestjs/common';
import { MedicalClient } from '../entities/medical-client.entity';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { PostMedicalClientManagementAndAreaRequestDto } from '../dtos/request/post.medical-client-management-area.request.dto';

@Injectable()
export class MedicalClientLocationService {

  constructor(
    @Inject(MedicalClientRepository) private readonly repository: MedicalClientRepository,
  ) { }

  async assignManagementAndArea(dni: string, newLocation: PostMedicalClientManagementAndAreaRequestDto): Promise<MedicalClient> {
    const client = await this.repository.findOneAndUpdate({ dni: dni }, { ...newLocation });
    return client;
  }

  async removeManagementAndArea(dni: string): Promise<MedicalClient> {
    const client = await this.repository.findOneAndUpdate({ dni: dni }, {
      areaId: null,
      areaName: null,
      managementId: null,
      managementName: null
    });
    return client;
  }
}
