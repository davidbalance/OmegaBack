import { Inject, Injectable } from '@nestjs/common';
import { WebResource } from '../entities/web-resource.entity';
import { WebResourceRespository } from '../repositories/web-resource.repository';

@Injectable()
export class NavResourceService {
  constructor(
    @Inject(WebResourceRespository) private readonly repository: WebResourceRespository
  ) { }

  async findAll(): Promise<WebResource[]> {
    const resources = await this.repository.find({
      where: {
        show: true,
        status: true
      }
    });
    return resources;
  }
}
