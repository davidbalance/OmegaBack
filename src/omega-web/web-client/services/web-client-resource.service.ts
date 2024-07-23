import { WebResource } from '@/omega-web/web-resource/entities/web-resource.entity';
import { WebResourceService } from '@/omega-web/web-resource/services/web-resource.service';
import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from '../repositories/web-client.repository';
import { PatchWebClientResourceRequestDto } from '../dtos/request/patch.web-client-resource.request.dto';

@Injectable()
export class WebClientResourceService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    @Inject(WebResourceService) private readonly resourceService: WebResourceService
  ) { }

  async findAll(user: number): Promise<WebResource[]> {
    const client = await this.repository.findOne({
      where: { user: user },
      select: {
        resources: { id: true, label: true }
      }
    });
    return client.resources;
  }

  async updateResources(user: number, { resources }: PatchWebClientResourceRequestDto): Promise<void> {
    const webResources = await this.resourceService.findInIds(resources);
    await this.repository.findOneAndUpdate(
      { user: user },
      { resources: webResources });
  }
}
