import { Controller, Get, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/authentication/guards';
import { FindWebClientResponseDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Omega Web')
@Controller('omega-web/clients')
export class WebClientController {
  constructor(private readonly webClientService: WebClientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneWebClientConfiguration(
    @User() user: number
  ): Promise<FindWebClientResponseDTO> {
    const webClient = await this.webClientService.findWebClient(user);
    return plainToInstance(FindWebClientResponseDTO, webClient);
  }
}
