import { Inject, Injectable } from '@nestjs/common';
import { WebRoutesRepository } from './web-routes.repository';
import { WebRoute } from './entities/web-route.entity';
import { CreateWebRouteRequestDTO, UpdateWebRouteRequestDTO } from './dto';

@Injectable()
export class WebRoutesService {
  constructor(
    @Inject(WebRoutesRepository) private readonly repository: WebRoutesRepository
  ) { }

  async create(createWebRoute: CreateWebRouteRequestDTO): Promise<WebRoute> {
    const route = await this.repository.create(createWebRoute);
    return route;
  }

  async findMany(ids: number[]): Promise<WebRoute[]> {
    return this.repository.findMany(ids);
  }

  async findOneAndUpdate(id: number, updateRoute: UpdateWebRouteRequestDTO): Promise<WebRoute> {
    const route = await this.repository.findOneAndUpdate({ id }, updateRoute);
    return route;
  }
}
