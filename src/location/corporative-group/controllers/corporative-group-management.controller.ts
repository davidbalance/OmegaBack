import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CorporativeGroupManagementService } from '../services/corporative-group-management.service';
import { GetCorporativeGroupArrayResponseDto } from '../dtos/response/get.corporative-group-array.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Location/Corporative/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('corporative/groups')
export class CorporativeGroupManagementController {
  constructor(
    @Inject(CorporativeGroupManagementService) private readonly corporativeGroupService: CorporativeGroupManagementService
  ) { }

  @Get()
  async find(): Promise<GetCorporativeGroupArrayResponseDto> {
    const data = await this.corporativeGroupService.find();
    return plainToInstance(GetCorporativeGroupArrayResponseDto, { data });
  }
}