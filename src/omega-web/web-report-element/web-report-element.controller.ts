import { Controller, Get } from '@nestjs/common';
import { WebReportElementService } from './web-report-element.service';
import { FindWebReportElementFieldsResponseDTO } from './dto';

@Controller('omega-web/report-elements')
export class WebReportElementController {
  constructor(private readonly webReportElementService: WebReportElementService) { }

  @Get()
  async findFields(): Promise<FindWebReportElementFieldsResponseDTO> {
    const options = await this.webReportElementService.findSelectorOptions();
    const mandatory = await this.webReportElementService.findManadatoryFields();
    return { options, mandatoryFields: mandatory }
  }

}
