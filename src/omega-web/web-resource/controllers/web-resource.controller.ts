import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetWebResourceArrayResponseDto } from '../dtos/response/web-resource-array.get.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WebResourceService } from '../services/web-resource.service';
import { PostWebResourceRequestDto } from '../dtos/request/web-resource.post.dto';
import { PatchWebResourceRequestDto } from '../dtos/request/web-resource.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Omega Web>Resource')
@Controller('omega/web/resources')
@UseGuards(JwtAuthGuard)
export class WebResourceController {
  constructor(
    @Inject(WebResourceService) private readonly webResourceService: WebResourceService
  ) { }

  @Get()
  async find(): Promise<GetWebResourceArrayResponseDto> {
    const data = await this.webResourceService.find();
    return plainToInstance(GetWebResourceArrayResponseDto, { data });
  }

  @Post()
  async createResource(
    @Body() body: PostWebResourceRequestDto
  ): Promise<any> {
    await this.webResourceService.create(body);
    return {}
  }

  @Patch(':id')
  async updateResource(
    @Param('id') id: number,
    @Body() body: PatchWebResourceRequestDto
  ): Promise<any> {
    await this.webResourceService.updateOne(id, body);
    return {}
  }

  @Delete(':id')
  async deleteResource(
    @Param('id') id: number
  ): Promise<any> {
    await this.webResourceService.deleteOne(id);
    return {}
  }
}
