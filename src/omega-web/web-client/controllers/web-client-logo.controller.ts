import { Body, Controller, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WebClientLogoService } from '../services/web-client-logo.service';
import { PatchWebClientLogoRequestDto } from '../dtos/request/patch.web-client-logo.request.dto';
import { PatchWebClientLogoResponseDto } from '../dtos/response/patch.web-client-logo.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('omega/web/clients/logos')
export class WebClientLogoController {

  constructor(
    @Inject(WebClientLogoService) private readonly service: WebClientLogoService
  ) { }

  @Patch(':user')
  async updateLogo(
    @Param('user') user: number,
    @Body() body: PatchWebClientLogoRequestDto
  ): Promise<PatchWebClientLogoResponseDto> {
    await this.service.updateLogo(user, body);
    return {};
  }
}
