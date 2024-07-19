import { Inject, Injectable } from '@nestjs/common';
import { JobPositionRepository } from '../repositories/job-position.repository';
import { JobPosition } from '../entities/job-position.entity';
import { POSTJobPositionRequestDto } from '../dtos/post.job-position.dto';
import { PATCHJobPositionRequestDto } from '../dtos/patch.job-position.dto';

@Injectable()
export class JobPositionManagementService {

  constructor(
    @Inject(JobPositionRepository) private readonly repository: JobPositionRepository
  ) { }

  async create(data: POSTJobPositionRequestDto): Promise<JobPosition> {
    const result = await this.repository.create(data);
    return result;
  }

  async findAll(): Promise<JobPosition[]> {
    const positions = await this.repository.find({ where: { status: true } });
    return positions;
  }

  async findOne(id: number): Promise<JobPosition> {
    const position = await this.repository.findOne({ where: { id } });
    return position;
  }

  async updateOne(id: number, data: PATCHJobPositionRequestDto): Promise<JobPosition> {
    const position = await this.repository.findOneAndUpdate({ id }, data);
    return position;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
