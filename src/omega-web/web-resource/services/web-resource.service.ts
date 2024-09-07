import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { WebResourceRespository } from '../repositories/web-resource.repository';
import { PatchWebResourceRequestDto } from '../dtos/request/web-resource.patch.dto';
import { WebResource } from '../dtos/response/web-resource.base.dto';
import { WebResourceRequestDto } from '../dtos/request/web-resource.base.dto';

@Injectable()
export class WebResourceService {
  constructor(
    @Inject(WebResourceRespository) private readonly repository: WebResourceRespository
  ) { }

  async findInNames(names: string[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { name: In(names) } });
    return resources;
  }

  async findInIds(ids: number[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { id: In(ids) } });
    return resources;
  }

  async find(): Promise<WebResource[]> {
    const resources = await this.repository.find({ order: { status: 'DESC' } });
    return resources;
  }

  async create(data: Partial<WebResourceRequestDto>): Promise<WebResource> {
    const resource = await this.repository.create(data);
    return resource;
  }

  async updateOne(id: number, data: PatchWebResourceRequestDto): Promise<WebResource> {
    const resource = await this.repository.findOneAndUpdate({ id }, { ...data });
    return resource;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
