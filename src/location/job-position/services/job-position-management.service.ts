import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JobPositionRepository } from '../repositories/job-position.repository';
import { JobPosition } from '../dtos/response/job-position.base.dto';
import { JobPositionRequestDto } from '../dtos/request/job-position.base.dto';

@Injectable()
export class JobPositionManagementService {

  constructor(
    @Inject(JobPositionRepository) private readonly repository: JobPositionRepository
  ) { }

  public async find(): Promise<JobPosition[]> {
    return await this.repository.find();
  }

  public async findOneByName(name: string): Promise<JobPosition> {
    return this.repository.findOne({ where: { name: name } });
  }

  public async create(data: JobPositionRequestDto): Promise<JobPosition> {
    return this.repository.create(data);
  }
}
