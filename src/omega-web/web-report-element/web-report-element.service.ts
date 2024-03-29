import { Inject, Injectable } from '@nestjs/common';
import { WebReportElementRepository } from './web-report-element.repository.dto';
import { SelectorOption } from '@/shared';

@Injectable()
export class WebReportElementService {

  constructor(
    @Inject(WebReportElementRepository) private readonly repository: WebReportElementRepository
  ) { }

  async findSelectorOptions(): Promise<SelectorOption<string>[]> {
    const elements = await this.repository.find({
      where: { status: true, mandatory: false },
      select: {
        name: true
      }
    });
    const options = elements.map((e) => ({
      key: e.name,
      label: e.name
    } as SelectorOption<string>));
    return options;
  }

  async findManadatoryFields(): Promise<string[]> {
    const elements = await this.repository.find({
      where: { status: true, mandatory: true },
      select: {
        name: true
      }
    });
    return elements.map((e) => e.name);
  }
}
