import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from './web-clinet.repository';
import { CreateWebClientRequestDTO, UpdateWebClientRoutesRequestDTO } from './dto';
import { WebClient } from './entities/web-client.entity';
import { WebRoutesService } from '../web-routes/web-routes.service';

@Injectable()
export class WebClientService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    @Inject(WebRoutesService) private readonly routeService: WebRoutesService
  ) { }

  async create(createWebClient: CreateWebClientRequestDTO): Promise<WebClient> {
    const webClient = await this.repository.create(createWebClient);
    return webClient;
  }

  async findOneWebClientConfiguration(user: number): Promise<WebClient> {
    const config = await this.repository.findOne({ user: user }, { routes: true });
    delete config.createAt;
    delete config.id;
    delete config.updateAt;
    delete config.user;
    return config;
  }

  async findOneUserAndUpdateRoutes(user: number, updateWebClientRoutes: UpdateWebClientRoutesRequestDTO): Promise<WebClient> {
    const routes = await this.routeService.findMany(updateWebClientRoutes.routes);
    return await this.repository.findOneAndUpdate({ user }, { routes });
  }

}
