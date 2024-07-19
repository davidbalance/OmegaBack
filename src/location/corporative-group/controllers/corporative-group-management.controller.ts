import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETCorporativeGroupArrayResponseDto } from '../dtos/corporative-group.response.dto';
import { CorporativeGroupManagementService } from '../services/corporative-group-management.service';

@ApiTags('Location/Corporative/Group')
@ApiBearerAuth()
@Controller('corporative/groups')
export class CorporativeGroupManagementController {
  constructor(
    @Inject(CorporativeGroupManagementService) private readonly corporativeGroupService: CorporativeGroupManagementService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETCorporativeGroupArrayResponseDto> {
    const groups = await this.corporativeGroupService.find();
    return plainToInstance(GETCorporativeGroupArrayResponseDto, { groups });
  }
}
