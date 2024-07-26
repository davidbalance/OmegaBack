import { User } from "@/shared/decorator";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, Inject, UseGuards, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PATCHApiKeyResponseDto } from "../dtos/response/patch.api-key.response.dto";
import { ApiKeyManagementService } from "../services/api-key-management.service";
import { GetApiKeyArrayResponseDto } from "../dtos/response/get.api-key-array.response.dto";
import { PostApiKeyRequestDto } from "../dtos/request/post.api-key.request.dto";
import { PostApiKeyResponseDto } from "../dtos/response/post.api-key.response.dto";
import { PatchApiKeyRequestDto } from "../dtos/request/patch.api-key.request.dto";

@ApiTags('Authentication/Api Key')
@ApiBearerAuth()
@Controller('api/key')
export class ApiKeyManagementController {
  constructor(
    @Inject(ApiKeyManagementService) private readonly service: ApiKeyManagementService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @User() user: number
  ): Promise<GetApiKeyArrayResponseDto> {
    const data = await this.service.findAll(user);
    return plainToInstance(GetApiKeyArrayResponseDto, { data });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: PostApiKeyRequestDto,
    @User() user: number
  ): Promise<PostApiKeyResponseDto> {
    const apikey = await this.service.create(user, body);
    return plainToInstance(PostApiKeyResponseDto, { ...apikey, apikey: apikey.value });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PatchApiKeyRequestDto
  ): Promise<PATCHApiKeyResponseDto> {
    const apikey = await this.service.updateOne(id, body);
    return plainToInstance(PATCHApiKeyResponseDto, apikey);
  }
}
