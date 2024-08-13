import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanySelectorService } from '../services/company-selector.service';
import { GetCompanySelectorOptionArrayResponseDto } from '../dtos/response/get.company-selector.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Location/Company', 'Selector')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('selector/companies')
export class CompanySelectorController {
  constructor(
    @Inject(CompanySelectorService) private readonly service: CompanySelectorService
  ) { }

  @Get(':group')
  async findSelectorOptions(
    @Param('group') group: number
  ): Promise<GetCompanySelectorOptionArrayResponseDto> {
    const options = await this.service.find(group);
    return plainToInstance(GetCompanySelectorOptionArrayResponseDto, { options });
  }
}
