import { Controller, Inject, UseGuards, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GetManagementArrayResponseDto } from "../dtos/response/management-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ManagementOptionService } from "../services/management-option.service";

@ApiTags('Location/Management', 'Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('management/options')
export class ManagementOptionController {
  constructor(
    @Inject(ManagementOptionService) private readonly service: ManagementOptionService
  ) { }

  @Get()
  async find(): Promise<GetManagementArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetManagementArrayResponseDto, { data });
  }
}
