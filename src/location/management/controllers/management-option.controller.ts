import { Controller, Inject, UseGuards, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ManagementOptionService } from "../services/management-option.service";
import { GetExtendedManagementArrayResponseDto } from "../dtos/response/extended-management-array.get.dto";

@ApiTags('Location>Management', 'Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('management/options')
export class ManagementOptionController {
  constructor(
    @Inject(ManagementOptionService) private readonly service: ManagementOptionService
  ) { }

  @Get()
  async find(): Promise<GetExtendedManagementArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetExtendedManagementArrayResponseDto, { data });
  }
}
