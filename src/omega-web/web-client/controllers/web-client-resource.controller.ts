import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WebClientResourceService } from '../services/web-client-resource.service';
import { PatchWebClientResourceRequestDto } from '../dtos/request/web-client-resource.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetNavResourceArrayResponseDto } from '@/omega-web/web-resource/dtos/response/nav-resource-array.get.dto';

@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('omega/web/clients/resources')
export class WebClientResourceController {
  constructor(
    @Inject(WebClientResourceService) private readonly service: WebClientResourceService
  ) { }

  @Get('resource/:user')
  async find(
    @Param('user') user: number,
  ): Promise<GetNavResourceArrayResponseDto> {
    const data = await this.service.find(user);
    return plainToInstance(GetNavResourceArrayResponseDto, { data });
  }

  @Patch('resource/:user')
  async assignWebResourceToWebClient(
    @Param('user') user: number,
    @Body() body: PatchWebClientResourceRequestDto
  ): Promise<any> {
    await this.service.updateResources(user, body);
    return {};
  }
}
