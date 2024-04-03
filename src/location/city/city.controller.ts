import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';
import { FindSelectorOptionsCityDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCityDTO> {
    const options = await this.cityService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCityDTO, { options });
  }

}
