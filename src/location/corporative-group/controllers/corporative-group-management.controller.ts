import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { CorporativeGroupManagementService } from '../services/corporative-group-management.service';
import { GetCorporativeGroupArrayResponseDto } from '../dtos/response/get.corporative-group-array.response.dto';
@ApiTags('Location/Corporative/Group')
@ApiBearerAuth()
@Controller('corporative/groups')
export class CorporativeGroupManagementController {
  constructor(
    @Inject(CorporativeGroupManagementService) private readonly corporativeGroupService: CorporativeGroupManagementService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GetCorporativeGroupArrayResponseDto> {
    const data = await this.corporativeGroupService.find();
    return plainToInstance(GetCorporativeGroupArrayResponseDto, { data });
  }
}
