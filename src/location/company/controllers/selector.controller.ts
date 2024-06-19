import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETSelectorOptionArrayResponseDto } from '../dtos/selector.response.dto';
import { SelectorService } from '../services/selector.service';

@ApiTags('Location/Company', 'Selector')
@ApiBearerAuth()
@Controller('selector/companies')
export class SelectorController {
  constructor(private readonly service: SelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':group')
  async findSelectorOptions(
    @Param('group') group: number
  ): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find(group);
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }
}
