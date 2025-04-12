import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { GetDiseaseGroupArrayResponseDto } from "../dtos/response/get.disease-group-array.response.dto";
import { PostDiseaseGroupRequestDto } from "../dtos/request/post.disease-group.request.dto";
import { PostDiseaseGroupResponseDto } from "../dtos/response/post.disease-group.response.dto";
import { PatchDiseaseGroupRequestDto } from "../dtos/request/patch.disease-group.request.dto";
import { PatchDiseaseGroupResponseDto } from "../dtos/response/patch.disease-group.response.dto";
import { DeleteDiseaseGroupResponseDto } from "../dtos/response/delete.disease-group.response.dto";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diseases/groups')
export class DiseaseGroupManagementController {
  constructor(
    @Inject(DiseaseGroupManagementService) private readonly diseaseGroupService: DiseaseGroupManagementService
  ) { }

  @Get()
  async find(): Promise<GetDiseaseGroupArrayResponseDto> {
    const data = await this.diseaseGroupService.find();
    return plainToInstance(GetDiseaseGroupArrayResponseDto, { data });
  }

  @Post()
  async create(
    @Body() body: PostDiseaseGroupRequestDto
  ): Promise<PostDiseaseGroupResponseDto> {
    const group = await this.diseaseGroupService.create(body);
    return plainToInstance(PostDiseaseGroupResponseDto, group);
  }

  @Patch(":id")
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchDiseaseGroupRequestDto
  ): Promise<PatchDiseaseGroupResponseDto> {
    const data = await this.diseaseGroupService.updateOne(id, body);
    return plainToInstance(PatchDiseaseGroupResponseDto, data);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DeleteDiseaseGroupResponseDto> {
    await this.diseaseGroupService.deleteOne(id);
    return {};
  }
}
