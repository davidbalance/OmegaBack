import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { FindBranchesResponseDTO, FindSelectorOptionsBranchDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';

@ApiTags('Location')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Authorize(ClaimEnum.READ, 'branch')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get(':company')
  async find(
    @Param('company') company: string
  ): Promise<FindBranchesResponseDTO> {
    const branches = await this.branchService.find(company);
    return plainToInstance(FindBranchesResponseDTO, { branches: branches });
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsBranchDTO> {
    const options = await this.branchService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsBranchDTO, { options });
  }
}
