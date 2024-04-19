import { Controller, Get, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { FindCitiesResponseDTO, FindSelectorOptionsCityDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Location')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Authorize(ClaimEnum.READ, 'city')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindCitiesResponseDTO> {
    const cities = await this.cityService.find();
    return plainToInstance(FindCitiesResponseDTO, { cities: cities });
  }


  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCityDTO> {
    const options = await this.cityService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCityDTO, { options });
  }

}
