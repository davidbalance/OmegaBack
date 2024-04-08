import { Controller, Get, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { FindSelectorOptionsBranchDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Location')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsBranchDTO> {
    const options = await this.branchService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsBranchDTO, { options });
  }
}
