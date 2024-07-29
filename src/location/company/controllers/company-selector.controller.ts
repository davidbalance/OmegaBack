import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { CompanySelectorService } from '../services/company-selector.service';
import { GetCompanySelectorOptionArrayResponseDto } from '../dtos/response/get.company-selector.response.dto';

@ApiTags('Location/Company', 'Selector')
@ApiBearerAuth()
@Controller('selector/companies')
export class CompanySelectorController {
  constructor(
    @Inject(CompanySelectorService) private readonly service: CompanySelectorService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get(':group')
  async findSelectorOptions(
    @Param('group') group: number
  ): Promise<GetCompanySelectorOptionArrayResponseDto> {
    const options = await this.service.find(group);
    return plainToInstance(GetCompanySelectorOptionArrayResponseDto, { options });
  }
}
