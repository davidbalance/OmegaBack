import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerPdfService } from './puppeteer-pdf.service';

describe('PuppeteerPdfService', () => {
  let service: PuppeteerPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuppeteerPdfService],
    }).compile();

    service = module.get<PuppeteerPdfService>(PuppeteerPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
