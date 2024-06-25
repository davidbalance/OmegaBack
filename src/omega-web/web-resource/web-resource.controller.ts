import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { ApiTags } from '@nestjs/swagger';
import { DELETEWebResourceResponseDto, GETFullWebResourceArrayResponseDto, GETWebResourceArrayResponseDto, PATCHWebResourceResponseDto, POSTWebResourceResponseDto } from './dto/web-resource.response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PATCHWebResourceRequestDto, POSTWebResourceRequestDto } from './dto/web-resource.request.dto';

@ApiTags('Omega/Web/Resource')
@Controller('omega/web/resources')
export class WebResourceController {
  constructor(
    @Inject(WebResourceService) private readonly webResourceService: WebResourceService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(): Promise<GETFullWebResourceArrayResponseDto> {
    const resources = await this.webResourceService.findAll();
    return plainToInstance(GETFullWebResourceArrayResponseDto, { resources });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findActiveResources(): Promise<GETWebResourceArrayResponseDto> {
    const resources = await this.webResourceService.findShowAndActiveResources();
    return plainToInstance(GETWebResourceArrayResponseDto, { resources });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createResource(
    @Body() body: POSTWebResourceRequestDto
  ): Promise<POSTWebResourceResponseDto> {
    const resource = await this.webResourceService.create(body);
    return plainToInstance(POSTWebResourceResponseDto, resource);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateResource(
    @Param('id') id: number,
    @Body() body: PATCHWebResourceRequestDto
  ): Promise<PATCHWebResourceResponseDto> {
    const resource = await this.webResourceService.update(id, body);
    return plainToInstance(PATCHWebResourceResponseDto, resource);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async deleteResource(
    @Param('id') id: number
  ): Promise<DELETEWebResourceResponseDto> {
    await this.webResourceService.delete(id);
    return {}
  }
}
