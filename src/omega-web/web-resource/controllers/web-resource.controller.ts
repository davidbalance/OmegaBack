import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetWebResourceArrayResponseDto } from '../dtos/response/get.web-resource-array.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WebResourceService } from '../services/web-resource.service';
import { PostWebResourceRequestDto } from '../dtos/request/post.web-resource.request.dto';
import { PatchWebResourceRequestDto } from '../dtos/request/patch.web-resource.request.dto';
import { PatchWebResourceResponseDto } from '../dtos/response/patch.web-resource.response.dto';
import { PostWebResourceResponseDto } from '../dtos/response/post.web-resource.response.dto';
import { DeleteWebResourceResponseDto } from '../dtos/response/delete.web-resource.response.dto';

@ApiTags('Omega/Web/Resource')
@Controller('omega/web/resources')
@UseGuards(JwtAuthGuard)
export class WebResourceController {
  constructor(
    @Inject(WebResourceService) private readonly webResourceService: WebResourceService
  ) { }

  @Get()
  async findAll(): Promise<GetWebResourceArrayResponseDto> {
    const data = await this.webResourceService.findAll();
    return plainToInstance(GetWebResourceArrayResponseDto, { data });
  }

  @Post()
  async createResource(
    @Body() body: PostWebResourceRequestDto
  ): Promise<PostWebResourceResponseDto> {
    const resource = await this.webResourceService.create(body);
    return plainToInstance(PostWebResourceResponseDto, resource);
  }

  @Patch(':id')
  async updateResource(
    @Param('id') id: number,
    @Body() body: PatchWebResourceRequestDto
  ): Promise<PatchWebResourceResponseDto> {
    const resource = await this.webResourceService.updateOne(id, body);
    return plainToInstance(PatchWebResourceResponseDto, resource);
  }

  @Delete(':id')
  async deleteResource(
    @Param('id') id: number
  ): Promise<DeleteWebResourceResponseDto> {
    await this.webResourceService.deleteOne(id);
    return {}
  }
}
