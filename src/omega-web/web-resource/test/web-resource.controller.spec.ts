import { Test, TestingModule } from '@nestjs/testing';
import { WebResourceController } from '../web-resource.controller';
import { WebResourceService } from '../web-resource.service';

describe('WebResourceController', () => {
  let controller: WebResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebResourceController],
      providers: [WebResourceService],
    }).compile();

    controller = module.get<WebResourceController>(WebResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
