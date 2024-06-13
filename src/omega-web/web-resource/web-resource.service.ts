import { Inject, Injectable } from '@nestjs/common';
import { WebResourceRespository } from './web-resource.repository';
import { WebResource } from './entities/web-resource.entity';
import { In } from 'typeorm';

@Injectable()
export class WebResourceService {
  constructor(
    @Inject(WebResourceRespository) private readonly repository: WebResourceRespository
  ) { }

  /**
   * Finds all the web resources that matches to an array of strings
   * @param names 
   * @returns Array of WebResource
   */
  async findInNames(names: string[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { name: In(names) } });
    return resources;
  }

  async findInIds(ids: number[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { id: In(ids) } });
    return resources;
  }

  async findAll(): Promise<WebResource[]> {
    const resources = await this.repository.find();
    return resources;
  }
}
