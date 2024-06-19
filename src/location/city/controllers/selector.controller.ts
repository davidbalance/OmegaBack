import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { SelectorService } from '../services/selector.service';
import { GETSelectorOptionArrayResponseDto } from '../dto/selector.response.dto';

@ApiTags('Location/City', 'Selector')
@ApiBearerAuth()
@Controller('selector/cities')
export class SelectorController {
  constructor(private readonly service: SelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }

}
