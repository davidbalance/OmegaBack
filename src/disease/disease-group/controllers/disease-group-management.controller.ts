import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { DELETEDiseaseGroupResponseDto } from "../dtos/delete.disease-group.dto";
import { GETDiseaseGroupArrayResponseDto } from "../dtos/get.disease-group.dto";
import { PATCHDiseaseGroupRequestDto, PATCHDiseaseGroupResponseDto } from "../dtos/patch.disease-group.dto";
import { POSTDiseaseGroupRequestDto, POSTDiseaseGroupResponseDto } from "../dtos/post.disease-group.dto";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diseases/groups')
export class DiseaseGroupManagementController {
  constructor(
    @Inject(DiseaseGroupManagementService) private readonly diseaseGroupService: DiseaseGroupManagementService
  ) { }

  @Get()
  async find(): Promise<GETDiseaseGroupArrayResponseDto> {
    const groups = await this.diseaseGroupService.find();
    return plainToInstance(GETDiseaseGroupArrayResponseDto, { groups: groups });
  }

  @Post()
  async create(
    @Body() body: POSTDiseaseGroupRequestDto
  ): Promise<POSTDiseaseGroupResponseDto> {
    const group = await this.diseaseGroupService.create(body);
    return plainToInstance(POSTDiseaseGroupResponseDto, group);
  }

  @Patch(":id")
  async updateOneById(
    @Param('id') id: number,
    @Body() body: PATCHDiseaseGroupRequestDto
  ): Promise<PATCHDiseaseGroupResponseDto> {
    await this.diseaseGroupService.updateOne(id, body);
    return {};
  }

  @Delete(':id')
  async deleteOneById(
    @Param('id') id: number
  ): Promise<DELETEDiseaseGroupResponseDto> {
    await this.diseaseGroupService.deleteOne(id);
    return {};
  }
}
