import { Controller, Get, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { FindSelectorOptionsCityDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCityDTO> {
    const options = await this.cityService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCityDTO, { options });
  }

}
