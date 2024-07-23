import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WebClientResourceService } from '../services/web-client-resource.service';
import { GetNavResourceArrayResponseDto } from '@/omega-web/web-resource/dtos/response/get.nav-resource-array.response.dto';
import { PatchWebClientResourceRequestDto } from '../dtos/request/patch.web-client-resource.request.dto';
import { PatchWebClientResourceResponseDto } from '../dtos/response/patch.web-client-resource.response.dto';


@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@Controller('omega/web/client/resources')
export class WebClientResourceController {
  constructor(
    @Inject(WebClientResourceService) private readonly service: WebClientResourceService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('resource/:user')
  async findOneWebResources(
    @Param('user') user: number,
  ): Promise<GetNavResourceArrayResponseDto> {
    const resources = await this.service.findAll(user);
    return plainToInstance(GetNavResourceArrayResponseDto, { resources });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('resource/:user')
  async assignWebResourceToWebClient(
    @Param('user') user: number,
    @Body() body: PatchWebClientResourceRequestDto
  ): Promise<PatchWebClientResourceResponseDto> {
    await this.service.updateResources(user, body);
    return plainToInstance(PatchWebClientResourceResponseDto, {});
  }
}
