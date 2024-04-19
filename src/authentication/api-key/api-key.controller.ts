import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyRequestDTO, CreateApiKeyResponseDTO } from './dto';
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

  @Authorize(ClaimEnum.CREATE, 'api-key')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post()
  async create(
    @Body() body: CreateApiKeyRequestDTO,
    @User() user: number
  ): Promise<CreateApiKeyResponseDTO> {
    const apikey = await this.apiKeyService.create({ ...body, user });
    return plainToInstance(CreateApiKeyResponseDTO, { apikey: apikey });
  }
}
