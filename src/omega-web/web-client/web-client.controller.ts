import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards';
import { FindWebClientResponseDTO, UpdateWebClientWebLogoRequestDTO, UpdateWebClientWebLogoResponseDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Omega Web')
@ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @Patch('logo/:user')
  async assignWebLogoToWebClient(
    @Param('user') user: number,
    @Body() body: UpdateWebClientWebLogoRequestDTO
  ): Promise<UpdateWebClientWebLogoResponseDTO> {
    await this.webClientService.updateWebLogoFromClient(user, body);
    return plainToInstance(UpdateWebClientWebLogoResponseDTO, {});
  }
}
