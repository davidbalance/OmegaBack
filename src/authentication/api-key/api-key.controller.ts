import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyRequestDTO, CreateApiKeyResponseDTO, FindApiKeyResponseDTO, FindApiKeysResponseDTO, FindOneAndDeleteApiKeyResponseDTO, FindOneAndUpdateApiKeyRequestDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorize, User } from '@/shared/decorator';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { ClaimEnum } from '@/shared';

@ApiTags('Api Key')
@ApiBearerAuth()
@Controller('api-key')
export class ApiKeyController {
  constructor(
    @Inject(ApiKeyService) private readonly apiKeyService: ApiKeyService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @User() user: number
  ): Promise<FindApiKeysResponseDTO> {
    const apiKeys = await this.apiKeyService.find(user);
    return plainToInstance(FindApiKeysResponseDTO, { apiKeys });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateApiKeyRequestDTO,
    @User() user: number
  ): Promise<CreateApiKeyResponseDTO> {
    const apikey = await this.apiKeyService.create({ ...body, user });
    return plainToInstance(CreateApiKeyResponseDTO, { apikey: apikey });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @User() body: FindOneAndUpdateApiKeyRequestDTO
  ): Promise<FindApiKeyResponseDTO> {
    const apikey = await this.apiKeyService.findOneAndUpdate({ id, ...body });
    return plainToInstance(FindApiKeyResponseDTO, apikey);
  }
}
