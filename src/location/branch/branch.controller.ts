import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { FindBranchesResponseDTO, FindSelectorOptionsBranchDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':company')
  async find(
    @Param('company') company: number
  ): Promise<FindBranchesResponseDTO> {
    const branches = await this.branchService.find(company);
    return plainToInstance(FindBranchesResponseDTO, { branches: branches });
  }

  @UseGuards(JwtAuthGuard)
  @Get('ruc/:company')
  async findByCompanyRuc(
    @Param('company') company: string
  ): Promise<FindBranchesResponseDTO> {
    const branches = await this.branchService.findByCompanyRuc(company);
    return plainToInstance(FindBranchesResponseDTO, { branches: branches });
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsBranchDTO> {
    const options = await this.branchService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsBranchDTO, { options });
  }
}
