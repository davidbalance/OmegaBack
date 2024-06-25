import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { WebClientService } from './web-client.service';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards';
import { FindWebClientResponseDto, UpdateWebClientWebLogoRequestDto, UpdateWebClientWebLogoResponseDto, UpdateWebClientWebResourceResponseDto, UpdateWebClientWebResourcesRequestDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GETWebResourceArrayResponseDto } from '../web-resource/dto/web-resource.response.dto';

@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@Controller('omega/web/clients')
export class WebClientController {
  constructor(private readonly webClientService: WebClientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneWebClientConfiguration(
    @User() user: number
  ): Promise<FindWebClientResponseDto> {
    const webClient = await this.webClientService.findWebClient(user);
    return plainToInstance(FindWebClientResponseDto, webClient);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('logo/:user')
  async assignWebLogoToWebClient(
    @Param('user') user: number,
    @Body() body: UpdateWebClientWebLogoRequestDto
  ): Promise<UpdateWebClientWebLogoResponseDto> {
    await this.webClientService.updateWebLogoFromClient(user, body);
    return plainToInstance(UpdateWebClientWebLogoResponseDto, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('resource/:user')
  async findOneWebResources(
    @Param('user') user: number,
  ): Promise<GETWebResourceArrayResponseDto> {
    const resources = await this.webClientService.findWebResources(user);
    return plainToInstance(GETWebResourceArrayResponseDto, { resources });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('resource/:user')
  async assignWebResourceToWebClient(
    @Param('user') user: number,
    @Body() body: UpdateWebClientWebResourcesRequestDto
  ): Promise<UpdateWebClientWebResourceResponseDto> {
    await this.webClientService.updateWebResourcesFromClient(user, body);
    return plainToInstance(UpdateWebClientWebResourceResponseDto, {});
  }
}
