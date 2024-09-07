import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { PostDiseaseGroupRequestDto } from "../dtos/request/disease-group.post.request.dto";
import { PatchDiseaseGroupRequestDto } from "../dtos/request/disease-group.patch.request.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetDiseaseGroupResponseDto } from "../dtos/response/disease-group.get.response.dto";
import { HasValueResponseDto } from "@/shared/utils/bases/base.has-value.dto";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('disease/groups')
export class DiseaseGroupManagementController {
  constructor(
    @Inject(DiseaseGroupManagementService) private readonly service: DiseaseGroupManagementService
  ) { }

  @Post()
  async create(
    @Body() body: PostDiseaseGroupRequestDto
  ): Promise<any> {
    await this.service.create(body);
    return {}
  }

  @Get(":id")
  async findOne(
    @Param('id') id: number
  ): Promise<GetDiseaseGroupResponseDto> {
    const data = await this.service.findOne(id);
    return plainToInstance(GetDiseaseGroupResponseDto, data);
  }

  @Get(":id/has/diseases")
  async hasChildren(
    @Param('id') id: number
  ): Promise<HasValueResponseDto> {
    const hasValue = await this.service.hasDiseases(id);
    return plainToInstance(HasValueResponseDto, { hasValue });
  }

  @Patch(":id")
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchDiseaseGroupRequestDto
  ): Promise<any> {
    await this.service.updateOne(id, body);
    return {}
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.deleteOne(id);
    return {};
  }
}
