import { Inject, Injectable } from '@nestjs/common';
import { ResourceRepository } from './resource.repository.dto';
import { FindResource } from './dto';
import { Resource } from './entities/resource.entity';
import { In } from 'typeorm';

@Injectable()
export class ResourceService {
  constructor(
    @Inject(ResourceRepository) private readonly repository: ResourceRepository
  ) { }

  async find(): Promise<FindResource[]> {
    const resources = await this.repository.find({
      where: { status: true },
      select: {
        id: true,
        name: true,
        claim: true
      }
    });
    return resources;
  }

  async findIn(ids: number[]): Promise<Resource[]> {
    return await this.repository.find({ where: { id: In(ids) } })
  }
}
