import { Test, TestingModule } from '@nestjs/testing';
import { WebClientController } from '../web-client.controller';
import { WebClientService } from '../web-client.service';

describe('WebClientController', () => {
  let controller: WebClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebClientController],
      providers: [WebClientService],
    }).compile();

    controller = module.get<WebClientController>(WebClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
