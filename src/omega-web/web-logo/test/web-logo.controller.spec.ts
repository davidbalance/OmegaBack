import { Test, TestingModule } from '@nestjs/testing';
import { WebLogoController } from '../web-logo.controller';
import { WebLogoService } from '../web-logo.service';

describe('WebLogoController', () => {
  let controller: WebLogoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebLogoController],
      providers: [WebLogoService],
    }).compile();

    controller = module.get<WebLogoController>(WebLogoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
