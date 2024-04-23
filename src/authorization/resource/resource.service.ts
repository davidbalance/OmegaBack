import { Inject, Injectable } from '@nestjs/common';
import { ResourceRepository } from './resource.repository.dto';
import { Resource } from './entities/resource.entity';
import { In } from 'typeorm';

@Injectable()
export class ResourceService {
  constructor(
    @Inject(ResourceRepository) private readonly repository: ResourceRepository
  ) { }

  /**
   * Find all the active resources
   * @returns Array of Resource
   */
  async find(): Promise<Resource[]> {
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

  /**
   * Find all the resources that matches with the given array of numbers
   * @param ids 
   * @returns Array of Resource
   */
  async findIn(ids: number[]): Promise<Resource[]> {
    return await this.repository.find({ where: { id: In(ids) } })
  }
}
