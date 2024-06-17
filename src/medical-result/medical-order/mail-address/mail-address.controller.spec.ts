import { Test, TestingModule } from '@nestjs/testing';
import { MailAddressController } from './mail-address.controller';

describe('MailAddressController', () => {
  let controller: MailAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailAddressController],
    }).compile();

    controller = module.get<MailAddressController>(MailAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
