import { Controller, Get, UseGuards } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { FindSelectorOptionsCorporativeGroupDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Location')
@Controller('corporative-groups')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCorporativeGroupDTO> {
    const options = await this.corporativeGroupService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCorporativeGroupDTO, { options });
  }
}
