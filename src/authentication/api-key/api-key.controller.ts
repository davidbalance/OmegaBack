import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyRequestDTO, CreateApiKeyResponseDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Api Key')
@Controller('api-key')
export class ApiKeyController {
  constructor(
    @Inject(ApiKeyService) private readonly apiKeyService: ApiKeyService
  ) { }

  @Post()
  async create(
    @Body() body: CreateApiKeyRequestDTO
  ): Promise<CreateApiKeyResponseDTO> {
    const apikey = await this.apiKeyService.create(body);
    return plainToInstance(CreateApiKeyResponseDTO, { apikey: apikey });
  }
}
