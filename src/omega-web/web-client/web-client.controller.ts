import { Controller, Get, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/authentication/guards';
import { FindOneWebClientResponseDTO } from './dto';

@Controller('omega-web/clients')
export class WebClientController {
  constructor(private readonly webClientService: WebClientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneWebClientConfiguration(
    @User() user: number
  ): Promise<FindOneWebClientResponseDTO> {
    const webClient = await this.webClientService.findWebClient(user);
    return { client: webClient };
  }
}
