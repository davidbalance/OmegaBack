import { User } from "@/shared/decorator";
import { Controller, Inject, UseGuards, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyManagementService } from "../services/api-key-management.service";
import { GetApiKeyArrayResponseDto } from "../dtos/response/get.api-key-array.response.dto";
import { PostApiKeyRequestDto } from "../dtos/request/post.api-key.request.dto";
import { PostApiKeyResponseDto } from "../dtos/response/post.api-key.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Authentication>Api Key')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/key')
export class ApiKeyManagementController {
  constructor(
    @Inject(ApiKeyManagementService) private readonly service: ApiKeyManagementService
  ) { }

  @Get()
  async find(
    @User() user: number
  ): Promise<GetApiKeyArrayResponseDto> {
    const data = await this.service.findAll(user);
    return plainToInstance(GetApiKeyArrayResponseDto, { data });
  }

  @Post()
  async create(
    @Body() body: PostApiKeyRequestDto,
    @User() user: number
  ): Promise<PostApiKeyResponseDto> {
    const apikey = await this.service.create(user, body);
    return plainToInstance(PostApiKeyResponseDto, { ...apikey, apikey: apikey.value });
  }
}
