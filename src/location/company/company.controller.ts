import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { FindCompaniesResponseDTO, FindSelectorOptionsCompanyDTO } from './dtos/company.response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Location')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Authorize(ClaimEnum.READ, 'company')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
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
