import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { CorporativeGroupManagementService } from '../services/corporative-group-management.service';
import { GETCorporativeGroupArrayResponseDto } from '../dtos/get.corporative-group.dto';

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
    const data = await this.corporativeGroupService.find();
    return plainToInstance(GETCorporativeGroupArrayResponseDto, { data });
  }
}
