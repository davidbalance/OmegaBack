import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GETSelectorOptionArrayResponseDto } from '../dtos/response/selector.response.dto';
import { CitySelectorService } from '../services/city-selector.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Location/City', 'Selector')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('selector/cities')
export class CitySelectorController {
  constructor(
    @Inject(CitySelectorService) private readonly service: CitySelectorService
  ) { }

  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }

}
