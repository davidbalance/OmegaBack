import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { BranchSelectorService } from '../services/branch-selector.service';
import { GetBranchSelectorOptionArrayResponseDto } from '../dtos/response/get.branch-selector.dto';

@ApiTags('Location/Branch', 'Selector')
@ApiBearerAuth()
@Controller('selector/branches')
export class BranchSelectorController {
  constructor(private readonly service: BranchSelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':company')
  async findSelectorOptions(
    @Param(':company') company: number
  ): Promise<GetBranchSelectorOptionArrayResponseDto> {
    const options = await this.service.find(company);
    return plainToInstance(GetBranchSelectorOptionArrayResponseDto, { options });
  }
}
