import { Controller, Get } from '@nestjs/common';
import { BranchService } from './branch.service';
import { FindBranchSelectorOptionsResponseDTO } from './dtos';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindBranchSelectorOptionsResponseDTO> {
    const options = await this.branchService.findSelectorOptions();
    return { options };
  }
}
