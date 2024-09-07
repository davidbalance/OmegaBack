import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from '../repositories/web-client.repository';
import { WebClient } from '../dtos/response/web-client.base.dto';

@Injectable()
export class WebClientService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository
  ) { }

  async findOne(user: number): Promise<WebClient> {
    const client = await this.repository.findOne({
      where: { user: user },
      select: {
        logo: { name: true },
        resources: { icon: true, label: true, address: true, }
      }
    });
    return client;
  }
}
