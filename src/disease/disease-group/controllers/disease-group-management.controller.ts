import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { PostDiseaseGroupRequestDto } from "../dtos/request/post.disease-group.request.dto";
import { PatchDiseaseGroupRequestDto } from "../dtos/request/patch.disease-group.request.dto";
import { DeleteDiseaseGroupResponseDto } from "../dtos/response/delete.disease-group.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { DiseaseGroupSingleResponseDto } from "../dtos/response/base.disease-group-single.response.dto";
import { GetDiseaseGroupCheckDiseaseResponseDto } from "../dtos/response/get.disease-group-check-diseases.dto";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diseases/groups')
export class DiseaseGroupManagementController {
  constructor(
    @Inject(DiseaseGroupManagementService) private readonly service: DiseaseGroupManagementService
  ) { }

  @Post()
  async create(
    @Body() body: PostDiseaseGroupRequestDto
  ): Promise<DiseaseGroupSingleResponseDto> {
    const group = await this.service.create(body);
    return plainToInstance(DiseaseGroupSingleResponseDto, group);
  }

  @Get(":id")
  async findOne(
    @Param('id') id: number
  ): Promise<DiseaseGroupSingleResponseDto> {
    const data = await this.service.findOneById(id);
    return plainToInstance(DiseaseGroupSingleResponseDto, data);
  }

  @Get(":id/has/diseases")
  async hasChildren(
    @Param('id') id: number
  ): Promise<GetDiseaseGroupCheckDiseaseResponseDto> {
    const data = await this.service.hasDiseases(id);
    return plainToInstance(GetDiseaseGroupCheckDiseaseResponseDto, { hasDiseases: data });
  }

  @Patch(":id")
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchDiseaseGroupRequestDto
  ): Promise<DiseaseGroupSingleResponseDto> {
    const data = await this.service.updateOne(id, body);
    return plainToInstance(DiseaseGroupSingleResponseDto, data);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DeleteDiseaseGroupResponseDto> {
    console.log(id);
    await this.service.deleteOne(id);
    return {};
  }
}
