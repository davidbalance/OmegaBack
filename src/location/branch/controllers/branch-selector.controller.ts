import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BranchSelectorService } from '../services/branch-selector.service';
import { GetBranchSelectorOptionArrayResponseDto } from '../dtos/response/get.branch-selector.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Location/Branch', 'Selector')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('selector/branches')
export class BranchSelectorController {
  constructor(
    @Inject(BranchSelectorService) private readonly service: BranchSelectorService
  ) { }

  @Get(':company')
  async findSelectorOptions(
    @Param(':company') company: number
  ): Promise<GetBranchSelectorOptionArrayResponseDto> {
    const options = await this.service.find(company);
    return plainToInstance(GetBranchSelectorOptionArrayResponseDto, { options });
  }
}
