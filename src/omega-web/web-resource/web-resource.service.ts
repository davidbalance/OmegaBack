import { Inject, Injectable } from '@nestjs/common';
import { CreateWebResourceDto } from './dto/create-web-resource.dto';
import { UpdateWebResourceDto } from './dto/update-web-resource.dto';
import { WebResourceRespository } from './web-resource.repository';
import { WebResource } from './entities/web-resource.entity';
import { In } from 'typeorm';

@Injectable()
export class WebResourceService {
  constructor(
    @Inject(WebResourceRespository) private readonly repository: WebResourceRespository
  ) { }

  async findInNames(names: string[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { name: In(names) } });
    return resources;
  }
}
