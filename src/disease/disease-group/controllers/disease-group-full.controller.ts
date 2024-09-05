import { Controller, UseGuards, Get, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupManagementService } from "../services/disease-group-management.service";
import { GetDiseaseGroupArrayResponseDto } from "../dtos/response/get.disease-group-array.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Disease/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diseases/groups/full')
export class DiseaseGroupFullController {
  constructor(
    @Inject(DiseaseGroupManagementService) private readonly service: DiseaseGroupManagementService
  ) { }

  @Get('')
  async findFull(): Promise<GetDiseaseGroupArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetDiseaseGroupArrayResponseDto, { data });
  }
}
