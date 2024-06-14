import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETApiKeyArrayResponseDTO, PATCHApiKeyResponseDTO, POSTApiKeyResponseDTO } from './dto/api-key.response.dto';
import { PATCHApiKeyRequestDTO, POSTApiKeyRequestDTO } from './dto/api-key.request.dto';

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
  ): Promise<GETApiKeyArrayResponseDTO> {
    const apiKeys = await this.apiKeyService.find(user);
    return plainToInstance(GETApiKeyArrayResponseDTO, { apiKeys });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTApiKeyRequestDTO,
    @User() user: number
  ): Promise<POSTApiKeyResponseDTO> {
    const apikey = await this.apiKeyService.create({ ...body, user });
    return plainToInstance(POSTApiKeyResponseDTO, { apikey: apikey });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @User() body: PATCHApiKeyRequestDTO
  ): Promise<PATCHApiKeyResponseDTO> {
    const apikey = await this.apiKeyService.findOneAndUpdate({ id, ...body });
    return plainToInstance(PATCHApiKeyResponseDTO, apikey);
  }
}
