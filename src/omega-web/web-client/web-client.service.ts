import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from './web-client.repository';
import { WebClient } from './entities/web-client.entity';

@Injectable()
export class WebClientService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository
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
}
