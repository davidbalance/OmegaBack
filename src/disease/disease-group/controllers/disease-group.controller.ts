import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupService } from "../services/disease-group-management.service";
import { DELETEDiseaseGroupResponseDto, GETDiseaseGroupArrayResponseDto, PATCHDiseaseGroupResponseDto, POSTDiseaseGroupResponseDto } from "../dtos/disease-group.response.dto";
import { PATCHDiseaseGroupRequestDto, POSTDiseaseGroupRequestDto } from "../dtos/disease-group.request.dto";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@Controller('diseases/groups')
export class DiseaseGroupController {
  constructor(private readonly diseaseGroupService: DiseaseGroupService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETDiseaseGroupArrayResponseDto> {
    const groups = await this.diseaseGroupService.find();
    return plainToInstance(GETDiseaseGroupArrayResponseDto, { groups: groups });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTDiseaseGroupRequestDto
  ): Promise<POSTDiseaseGroupResponseDto> {
    const group = await this.diseaseGroupService.create(body);
    return plainToInstance(POSTDiseaseGroupResponseDto, group);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PATCHDiseaseGroupRequestDto
  ): Promise<PATCHDiseaseGroupResponseDto> {
    await this.diseaseGroupService.findOneAndUpdate(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<DELETEDiseaseGroupResponseDto> {
    await this.diseaseGroupService.findOneAndDelete(id);
    return {};
  }
}
