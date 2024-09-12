import { Inject, Injectable } from '@nestjs/common';
import { ManagementRepository } from '../repositories/management.repository';
import { ExtendedManagement } from '../dtos/response/extended-management.base.dto';

@Injectable()
export class ManagementOptionService {
  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { }

  async find(): Promise<ExtendedManagement[]> {
    const managements = await this.repository.find({
      where: { status: true },
      relations: { areas: true }
    });
    return managements;
  }
}
