import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from './web-client.repository';
import { FindWebClient } from './dto';

@Injectable()
export class WebClientService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository
  ) { }

  async findWebClient(user: number): Promise<FindWebClient> {
    const client = await this.repository.findOne({
      where: { user: user },
      select: {
        logo: {
          address: true
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
}
