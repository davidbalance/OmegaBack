import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { CorporativeGroupService } from '../services/corporative-group.service';
import { GETCorporativeGroupArrayResponseDto } from '../dtos/corporative-group.response.dto';

@ApiTags('Location/Corporative/Group')
@ApiBearerAuth()
@Controller('corporative/groups')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETCorporativeGroupArrayResponseDto> {
    const groups = await this.corporativeGroupService.find();
    return plainToInstance(GETCorporativeGroupArrayResponseDto, { groups });
  }
}
