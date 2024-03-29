import { Controller, Get } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { FindCorporativeGroupSelectorOptions } from './dtos';

@Controller('corporative-group')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindCorporativeGroupSelectorOptions> {
    const options = await this.corporativeGroupService.findSelectorOptions();
    return { options };
  }
}
