import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETSelectorOptionArrayResponseDto } from '../dtos/selector.response.dto';
import { SelectorService } from '../services/selector.service';

@ApiTags('Location/Branch', 'Selector')
@ApiBearerAuth()
@Controller('selector/branches')
export class SelectorController {
  constructor(private readonly service: SelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':company')
  async findSelectorOptions(
    @Param(':company') company: number
  ): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find(company);
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }
}
