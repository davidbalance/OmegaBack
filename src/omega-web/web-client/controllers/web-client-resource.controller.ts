import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WebClientResourceService } from '../services/web-client-resource.service';
import { PatchWebClientResourceRequestDto } from '../dtos/request/web-client-resource.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { User } from '@/shared/decorator';
import { GetWebResourceArrayResponseDto } from '@/omega-web/web-resource/dtos/response/web-resource-array.get.dto';

@ApiTags('Omega Web>Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('omega/web/client/resource')
export class WebClientResourceController {
  constructor(
    @Inject(WebClientResourceService) private readonly service: WebClientResourceService
  ) { }

  @Get('user')
  async find(
    @User() user: number,
  ): Promise<GetWebResourceArrayResponseDto> {
    const data = await this.service.find(user);
    return plainToInstance(GetWebResourceArrayResponseDto, { data });
  }

  @Get(':user')
  async findResources(
    @Param('user') user: number,
  ): Promise<GetWebResourceArrayResponseDto> {
    const data = await this.service.find(user);
    return plainToInstance(GetWebResourceArrayResponseDto, { data });
  }

  @Patch(':user')
  async assignWebResourceToWebClient(
    @Param('user') user: number,
    @Body() body: PatchWebClientResourceRequestDto
  ): Promise<any> {
    await this.service.updateResources(user, body);
    return {};
  }
}
