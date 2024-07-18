import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { CorporativeGroupSelectorService } from '../services/selector.service';
import { GETSelectorOptionArrayResponseDto } from '../dtos/selector.response.dto';

@ApiTags('Location/Corporative/Group', 'Selector')
@ApiBearerAuth()
@Controller('selector/corporative/groups')
export class SelectorController {
  constructor(private readonly service: CorporativeGroupSelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }
}
