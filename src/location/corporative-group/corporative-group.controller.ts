import { Controller, Get, UseGuards } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { FindCorporativeGroupsResponseDTO, FindSelectorOptionsCorporativeGroupDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('corporative-groups')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }

  @Authorize(ClaimEnum.READ, 'corporative-group')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindCorporativeGroupsResponseDTO> {
    const groups = await this.corporativeGroupService.findSelectorOptions();
    return plainToInstance(FindCorporativeGroupsResponseDTO, { groups });
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCorporativeGroupDTO> {
    const options = await this.corporativeGroupService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCorporativeGroupDTO, { options });
  }
}
