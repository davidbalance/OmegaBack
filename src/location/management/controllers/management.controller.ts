import { Controller, Inject, UseGuards, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ManagementService } from "../services/management.service";
import { PatchMagementRequestDto } from "../dtos/request/management.patch.dto";
import { PostManagementRequestDto } from "../dtos/request/management.post.dto";
import { GetManagementArrayResponseDto } from "../dtos/response/management-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetManagementResponseDto } from "../dtos/response/management.get.dto";
import { HasValueResponseDto } from "@/shared/utils/bases/base.has-value.dto";

@ApiTags('Location>Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('management')
export class ManagementController {
  constructor(
    @Inject(ManagementService) private readonly service: ManagementService
  ) { }

  @Post()
  async create(
    @Body() createManagementDto: PostManagementRequestDto
  ): Promise<any> {
    const management = await this.service.create(createManagementDto);
    return {}
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<GetManagementResponseDto> {
    const data = await this.service.findOne(id);
    return plainToInstance(GetManagementResponseDto, data);
  }

  @Get(':id/has/areas')
  async hasAreas(
    @Param('id') id: number
  ): Promise<HasValueResponseDto> {
    const hasValue = await this.service.hasAreas(id);
    return plainToInstance(HasValueResponseDto, { hasValue });
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() updateManagementDto: PatchMagementRequestDto
  ): Promise<any> {
    await this.service.updateOne(id, updateManagementDto);
    return {}
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: string
  ): Promise<any> {
    await this.service.deleteOne(+id);
    return {};
  }
}
