import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from './web-client.repository';
import { WebClient } from './entities/web-client.entity';
import { WebLogoService } from '../web-logo/web-logo.service';
import { UpdateWebClientWebLogoRequestDto, UpdateWebClientWebResourcesRequestDto } from './dto';
import { WebResourceService } from '../web-resource/web-resource.service';
import { WebResource } from '../web-resource/entities/web-resource.entity';

@Injectable()
export class WebClientService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    @Inject(WebLogoService) private readonly logoService: WebLogoService,
    @Inject(WebResourceService) private readonly resourceService: WebResourceService
  ) { }

  /**
   * Finds a web client by its user key
   * @param user 
   * @returns WebClient
   */
  async findWebClient(user: number): Promise<WebClient> {
    const client = await this.repository.findOne({
      where: { user: user },
      select: {
        logo: {
          name: true
        },
        resources: {
          icon: true,
          label: true,
          address: true,
        }
      }
    });
    return client;
  }

  async findWebResources(user: number): Promise<WebResource[]> {
    const client = await this.repository.findOne({
      where: { user: user },
      select: {
        resources: {
          id: true,
          label: true
        }
      }
    });
    return client.resources;
  }

  async updateWebLogoFromClient(user: number, { logo }: UpdateWebClientWebLogoRequestDto): Promise<void> {
    const foundLogo = await this.logoService.findOne(logo);
    await this.repository.findOneAndUpdate({
      user: user
    }, {
      logo: foundLogo
    });
  }

  async updateWebResourcesFromClient(user: number, { resources }: UpdateWebClientWebResourcesRequestDto): Promise<void> {
    const webResources = await this.resourceService.findInIds(resources);
    await this.repository.findOneAndUpdate({
      user: user
    }, {
      resources: webResources
    });
  }
}
