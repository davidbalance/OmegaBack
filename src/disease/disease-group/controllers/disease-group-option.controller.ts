import { Controller, UseGuards, Get, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetDiseaseGroupArrayResponseDto } from "../dtos/response/extended-disease-group-array.get.response.dto";
import { DiseaseGroupOptionService } from "../services/disease-group-option.service";

@ApiTags('Disease>Disease Group', 'Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('disease/groups/options')
export class DiseaseGroupOptionController {
  constructor(
    @Inject(DiseaseGroupOptionService) private readonly service: DiseaseGroupOptionService
  ) { }

  @Get()
  async find(): Promise<GetDiseaseGroupArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetDiseaseGroupArrayResponseDto, { data });
  }
}
