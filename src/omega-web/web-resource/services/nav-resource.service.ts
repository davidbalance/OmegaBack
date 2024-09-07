import { Inject, Injectable } from '@nestjs/common';
import { WebResourceRespository } from '../repositories/web-resource.repository';
import { NavResource } from '../dtos/response/nav-resource.base.dto';

@Injectable()
export class NavResourceService {
  constructor(
    @Inject(WebResourceRespository) private readonly repository: WebResourceRespository
  ) { }

  async findAll(): Promise<NavResource[]> {
    const resources = await this.repository.find({
      where: {
        show: true,
        status: true
      }
    });
    return resources;
  }
}
