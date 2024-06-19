import { Test, TestingModule } from '@nestjs/testing';
import { FileDownloaderController } from './file-downloader.controller';

describe('FileDownloaderController', () => {
  let controller: FileDownloaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileDownloaderController],
    }).compile();

    controller = module.get<FileDownloaderController>(FileDownloaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
