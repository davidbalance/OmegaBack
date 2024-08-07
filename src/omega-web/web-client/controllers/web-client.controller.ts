import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WebClientService } from '../services/web-client.service';
import { GetWebClientResponseDto } from '../dtos/response/get.web-client.response.dto';

@ApiTags('Omega/Web/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('omega/web/clients')
export class WebClientController {

  constructor(
    @Inject(WebClientService) private readonly service: WebClientService
  ) { }

  @Get()
  async findOne(
    @User() user: number
  ): Promise<GetWebClientResponseDto> {
    const webClient = await this.service.findOne(user);
    return plainToInstance(GetWebClientResponseDto, webClient);
  }
}
