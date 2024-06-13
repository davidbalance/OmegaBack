import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { FindCompaniesResponseDTO, FindSelectorOptionsCompanyDTO } from './dtos/company.response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':group')
  async find(
    @Param('group') group: number
  ): Promise<FindCompaniesResponseDTO> {
    const companies = await this.companyService.find(group);
    return plainToInstance(FindCompaniesResponseDTO, { companies: companies });
  }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsCompanyDTO> {
    const options = await this.companyService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsCompanyDTO, { options });
  }
}
