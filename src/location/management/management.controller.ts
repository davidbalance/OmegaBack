import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PATCHManagementRequestDto, POSTManagementRequestDto } from './dto/management.request.dto';
import { DELETEManagementResponseDto, GETManagementArrayResponseDto, PATCHManagementResponseDto, POSTManagementResponseDto } from './dto/management.response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Location/Management')
@ApiBearerAuth()
@Controller('management')
export class ManagementController {
  constructor(
    @Inject(ManagementService) private readonly service: ManagementService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<GETManagementArrayResponseDto> {
    const managements = await this.service.find();
    return plainToInstance(GETManagementArrayResponseDto, { managements });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createManagementDto: POSTManagementRequestDto): Promise<POSTManagementResponseDto> {
    const management = await this.service.create(createManagementDto);
    return plainToInstance(POSTManagementResponseDto, management);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateManagementDto: PATCHManagementRequestDto
  ): Promise<PATCHManagementResponseDto> {
    const management = await this.service.findOneByIdAndUpdate(id, updateManagementDto);
    return plainToInstance(POSTManagementResponseDto, management);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<DELETEManagementResponseDto> {
    await this.service.findOneAndDelete(+id);
    return {};
  }
}
