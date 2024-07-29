import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETSelectorOptionArrayResponseDto } from '../dtos/response/selector.response.dto';
import { CitySelectorService } from '../services/city-selector.service';

@ApiTags('Location/City', 'Selector')
@ApiBearerAuth()
@Controller('selector/cities')
export class CitySelectorController {
  constructor(
    @Inject(CitySelectorService) private readonly service: CitySelectorService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }

}
