import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { WebResource } from '../entities/web-resource.entity';
import { WebResourceRespository } from '../repositories/web-resource.repository';
import { PostWebResourceRequestDto } from '../dtos/request/post.web-resource.request.dto';
import { PatchWebResourceRequestDto } from '../dtos/request/patch.web-resource.request.dto';

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

  async findAll(): Promise<WebResource[]> {
    const resources = await this.repository.find({ order: { status: 'DESC' } });
    return resources;
  }

  async create(data: PostWebResourceRequestDto): Promise<WebResource> {
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
