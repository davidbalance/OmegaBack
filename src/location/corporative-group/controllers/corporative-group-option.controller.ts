import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { CorporativeGroupOptionService } from '../services/corporative-group-option.service';
import { GetExtendedCorporativeGroupArrayResponseDto } from '../dtos/response/extended-corporative-group-array.get.dto';

@ApiTags('Location>Corporative Group', 'Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/groups/options')
export class CorporativeGroupOptionController {
  constructor(
    @Inject(CorporativeGroupOptionService) private readonly service: CorporativeGroupOptionService
  ) { }

  @Get()
  async find(): Promise<GetExtendedCorporativeGroupArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetExtendedCorporativeGroupArrayResponseDto, { data });
  }
}