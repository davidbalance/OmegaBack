import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { CorporativeGroupSelectorService } from '../services/corporative-group-selector.service';
import { GetCorporativeGroupSelectorOptionArrayResponseDto } from '../dtos/response/get.corporative-group-selector-response.dto';

@ApiTags('Location/Corporative/Group', 'Selector')
@ApiBearerAuth()
@Controller('selector/corporative/groups')
export class CorporativeGroupSelectorController {
  constructor(
    @Inject(CorporativeGroupSelectorService) private readonly service: CorporativeGroupSelectorService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GetCorporativeGroupSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GetCorporativeGroupSelectorOptionArrayResponseDto, { options });
  }
}
