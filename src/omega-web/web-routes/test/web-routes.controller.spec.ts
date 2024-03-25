import { Test, TestingModule } from '@nestjs/testing';
import { WebRoutesController } from '../web-routes.controller';
import { WebRoutesService } from '../web-routes.service';

describe('WebRoutesController', () => {
  let controller: WebRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebRoutesController],
      providers: [WebRoutesService],
    }).compile();

    controller = module.get<WebRoutesController>(WebRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
