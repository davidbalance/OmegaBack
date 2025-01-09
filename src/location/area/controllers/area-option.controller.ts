import { Controller, Inject, UseGuards, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { AreaOptionService } from "../services/area-option.service";
import { GetExtendedAreaArrayResponseDto } from "../dtos/response/extended-area-array.get.dto";

@ApiTags('Location>Area', 'Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('area/options')
export class AreaOptionController {
  constructor(
    @Inject(AreaOptionService) private readonly service: AreaOptionService
  ) { }

  @Get()
  async find(): Promise<GetExtendedAreaArrayResponseDto> {
    const data = await this.service.find();
      return plainToInstance(GetExtendedAreaArrayResponseDto, { data });
  }
}
