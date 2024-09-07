import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AreaManagementService } from '../services/area-management.service';
import { PostAreaRequestDto } from '../dtos/request/area.post.request.dto';
import { PatchAreaRequestDto } from '../dtos/request/area.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetAreaResponseDto } from '../dtos/response/area.get.dto';

@ApiTags('Location>Area')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('areas')
export class AreaManagementController {
  constructor(
    @Inject(AreaManagementService) private readonly service: AreaManagementService
  ) { }

  @Post()
  async create(
    @Body() createAreaDto: PostAreaRequestDto
  ): Promise<any> {
    const area = await this.service.create(createAreaDto);
    return {}
  }

  @Get('area/:id')
  async findOne(
    @Param('id') id: string,
  ): Promise<GetAreaResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GetAreaResponseDto, data);
  }


  @Patch('area/:id')
  async findOneAndUpdate(
    @Param('id') id: string,
    @Body() updateAreaDto: PatchAreaRequestDto
  ): Promise<any> {
    const area = await this.service.updateOne(+id, updateAreaDto);
    return {}
  }

  @Delete('area/:id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<any> {
    await this.service.deleteOne(+id);
    return {};
  }
}