import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards';
import { FindWebClientResponseDTO, UpdateWebClientWebLogoRequestDTO, UpdateWebClientWebLogoResponseDTO, UpdateWebClientWebResourceResponseDTO, UpdateWebClientWebResourcesRequestDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllWebResourceResponseDto } from '../web-resource/dto/web-resource.response.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('resource/:user')
  async findOneWebResources(
    @Param('user') user: number,
  ): Promise<FindAllWebResourceResponseDto> {
    const resources = await this.webClientService.findWebResources(user);
    return plainToInstance(FindAllWebResourceResponseDto, { resources });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('resource/:user')
  async assignWebResourceToWebClient(
    @Param('user') user: number,
    @Body() body: UpdateWebClientWebResourcesRequestDTO
  ): Promise<UpdateWebClientWebResourceResponseDTO> {
    await this.webClientService.updateWebResourcesFromClient(user, body);
    return plainToInstance(UpdateWebClientWebResourceResponseDTO, {});
  }
}
