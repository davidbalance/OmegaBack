import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllWebResourceResponseDto } from './dto/web-resource.response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Omega/Web/Resource')
@Controller('omega/web/resources')
export class WebResourceController {
  constructor(
    @Inject(WebResourceService) private readonly webResourceService: WebResourceService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<FindAllWebResourceResponseDto> {
    const resources = await this.webResourceService.findAll();
    return plainToInstance(FindAllWebResourceResponseDto, { resources });
  }
}
