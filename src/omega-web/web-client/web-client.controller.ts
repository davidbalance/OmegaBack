import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { FindWebClientConfiguration } from './dto';
import { User } from '@/shared/decorator';

@Controller('web-client')
export class WebClientController {
  constructor(private readonly webClientService: WebClientService) { }

  @UseGuards()
  @Get()
  async findOneWebClientConfiguration(
    @User() user: number
  ): Promise<FindWebClientConfiguration> {
    const webClient = await this.webClientService.findOneWebClientConfiguration(user);
    return { client: webClient };
  }
}
