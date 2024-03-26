import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { FindWebClientConfiguration } from './dto';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/authentication/guards';

@Controller('clients')
export class WebClientController {
  constructor(private readonly webClientService: WebClientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneWebClientConfiguration(
    @User() user: number
  ): Promise<FindWebClientConfiguration> {
    const webClient = await this.webClientService.findOneWebClientConfiguration(user);
    return { client: webClient };
  }
}
