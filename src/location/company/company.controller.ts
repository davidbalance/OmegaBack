import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { FindCompanySelectorOptionsResponseDTO } from './dtos/company.response.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindCompanySelectorOptionsResponseDTO> {
    const options = await this.companyService.findSelectorOptions();
    return { options };
  }
}
