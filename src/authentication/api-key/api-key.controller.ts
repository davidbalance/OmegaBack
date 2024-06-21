import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETApiKeyArrayResponseDto, PATCHApiKeyResponseDto, POSTApiKeyResponseDto } from './dto/api-key.response.dto';
import { PATCHApiKeyRequestDto, POSTApiKeyRequestDto } from './dto/api-key.request.dto';

@ApiTags('Authentication/Api Key')
@ApiBearerAuth()
@Controller('api/key')
export class ApiKeyController {
  constructor(
    @Inject(ApiKeyService) private readonly apiKeyService: ApiKeyService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @User() user: number
  ): Promise<GETApiKeyArrayResponseDto> {
    const apiKeys = await this.apiKeyService.find(user);
    return plainToInstance(GETApiKeyArrayResponseDto, { apiKeys });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTApiKeyRequestDto,
    @User() user: number
  ): Promise<POSTApiKeyResponseDto> {
    const apikey = await this.apiKeyService.create({ ...body, user });
    return plainToInstance(POSTApiKeyResponseDto, apikey);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PATCHApiKeyRequestDto
  ): Promise<PATCHApiKeyResponseDto> {
    const apikey = await this.apiKeyService.findOneAndUpdate({ id, ...body });
    return plainToInstance(PATCHApiKeyResponseDto, apikey);
  }
}
