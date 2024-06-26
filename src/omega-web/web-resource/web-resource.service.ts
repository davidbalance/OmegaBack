import { Inject, Injectable } from '@nestjs/common';
import { WebResourceRespository } from './web-resource.repository';
import { WebResource } from './entities/web-resource.entity';
import { In } from 'typeorm';
import { PATCHWebResourceRequestDto, POSTWebResourceRequestDto } from './dto/web-resource.request.dto';

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

  async findShowAndActiveResources(): Promise<WebResource[]> {
    const resources = await this.repository.find({
      where: {
        show: true,
        status: true
      }
    });
    return resources;
  }

  async findAll(): Promise<WebResource[]> {
    const resources = await this.repository.find({ order: { status: 'DESC' } });
    return resources;
  }

  async create(data: POSTWebResourceRequestDto): Promise<WebResource> {
    const resource = await this.repository.create(data);
    return resource;
  }

  async update(id: number, data: PATCHWebResourceRequestDto): Promise<WebResource> {
    const resource = await this.repository.findOneAndUpdate({ id }, { ...data });
    return resource;
  }

  async delete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
