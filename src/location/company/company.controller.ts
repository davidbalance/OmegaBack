import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { FindSelectorOptionsCompanyDTO } from './dtos/company.response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Location')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCompanyDTO> {
    const options = await this.companyService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCompanyDTO, { options });
  }
}
