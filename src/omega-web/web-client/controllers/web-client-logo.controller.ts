import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WebClientLogoService } from '../services/web-client-logo.service';
import { PatchWebClientLogoRequestDto } from '../dtos/request/web-client-logo.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetWebClientLogoResponseDto } from '../dtos/response/web-client-logo.get.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('omega/web/clients/logos')
export class WebClientLogoController {

  constructor(
    @Inject(WebClientLogoService) private readonly service: WebClientLogoService
  ) { }

  @Get()
  async findLogo(
    @Param('user') user: number
  ): Promise<GetWebClientLogoResponseDto> {
    const logo = await this.service.findLogo(user);
    return plainToInstance(GetWebClientLogoResponseDto, { logo });
  }

  @Patch(':user')
  async updateLogo(
    @Param('user') user: number,
    @Body() body: PatchWebClientLogoRequestDto
  ): Promise<any> {
    await this.service.updateLogo(user, body);
    return {};
  }
}
