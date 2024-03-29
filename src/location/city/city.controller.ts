import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';
import { FindCitySelectorOptions } from './dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindCitySelectorOptions> {
    const options = await this.cityService.findSelectorOptions();
    return { options };
  }

}
