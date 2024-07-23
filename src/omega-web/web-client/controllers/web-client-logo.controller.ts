import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WebClientLogoService } from '../services/web-client-logo.service';
import { PatchWebClientLogoRequestDto } from '../dtos/request/patch.web-client-logo.request.dto';
import { PatchWebClientLogoResponseDto } from '../dtos/response/patch.web-client-logo.response.dto';

@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('omega/web/client/logos')
export class WebClientLogoController {

  constructor(
    @Inject(WebClientLogoService) private readonly service: WebClientLogoService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Patch(':user')
  async updateLogo(
    @Param('user') user: number,
    @Body() body: PatchWebClientLogoRequestDto
  ): Promise<PatchWebClientLogoResponseDto> {
    await this.service.updateLogo(user, body);
    return plainToInstance(PatchWebClientLogoResponseDto, {});
  }
}
