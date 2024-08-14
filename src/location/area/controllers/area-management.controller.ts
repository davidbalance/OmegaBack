import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AreaManagementService } from '../services/area-management.service';
import { GetAreaArrayResponseDto } from '../dtos/response/get.area-array.response.dto';
import { PostAreaRequestDto } from '../dtos/request/post.area.request.dto';
import { PostAreaResponseDto } from '../dtos/response/post.area.response.dto';
import { PatchAreaRequestDto } from '../dtos/request/patch.area.request.dto';
import { PatchAreaResponseDto } from '../dtos/response/patch.area.response.dto';
import { DeleteAreaResponseDto } from '../dtos/response/delete.area.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Location/Area')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('area')
export class AreaManagementController {
  constructor(
    @Inject(AreaManagementService) private readonly service: AreaManagementService
  ) { }

  @Get()
  async findAll(): Promise<GetAreaArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetAreaArrayResponseDto, { data });
  }

  @Post()
  async create(
    @Body() createAreaDto: PostAreaRequestDto
  ): Promise<PostAreaResponseDto> {
    const area = await this.service.create(createAreaDto);
    return plainToInstance(PostAreaResponseDto, area);
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: string,
    @Body() updateAreaDto: PatchAreaRequestDto
  ): Promise<PatchAreaResponseDto> {
    const area = await this.service.updateOne(+id, updateAreaDto);
    return plainToInstance(PatchAreaResponseDto, area);
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<DeleteAreaResponseDto> {
    await this.service.deleteOne(+id);
    return {};
  }
}