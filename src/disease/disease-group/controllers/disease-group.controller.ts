import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupService } from "../services/disease-group.service";
import { DELETEDiseaseGroupResponseDTO, GETDiseaseGroupArrayResponseDTO, PATCHDiseaseGroupResponseDTO, POSTDiseaseGroupResponseDTO } from "../dtos/disease-group.response.dto";
import { PATCHDiseaseGroupRequestDTO, POSTDiseaseGroupRequestDTO } from "../dtos/disease-group.request.dto";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@Controller('diseases/groups')
export class DiseaseGroupController {
  constructor(private readonly diseaseGroupService: DiseaseGroupService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETDiseaseGroupArrayResponseDTO> {
    const groups = await this.diseaseGroupService.find();
    return plainToInstance(GETDiseaseGroupArrayResponseDTO, { groups: groups });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTDiseaseGroupRequestDTO
  ): Promise<POSTDiseaseGroupResponseDTO> {
    const group = await this.diseaseGroupService.create(body);
    return plainToInstance(POSTDiseaseGroupResponseDTO, group);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PATCHDiseaseGroupRequestDTO
  ): Promise<PATCHDiseaseGroupResponseDTO> {
    await this.diseaseGroupService.findOneAndUpdate(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<DELETEDiseaseGroupResponseDTO> {
    await this.diseaseGroupService.findOneAndDelete(id);
    return {};
  }
}
