import { Test, TestingModule } from '@nestjs/testing';
import { MailAddressService } from './mail-address.service';

describe('MailAddressService', () => {
  let service: MailAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailAddressService],
    }).compile();

    service = module.get<MailAddressService>(MailAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
