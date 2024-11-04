import { ZipperService } from './zipper.service';
import { PassThrough } from 'stream';
import { TestBed } from '@automock/jest';
import { NestArchiver, NestArchiverDelegate } from '../nest-ext/nest-archiver/nest-archiver.type';
import { NestFS } from '../nest-ext/nest-fs/nest-fs.type';
import { NestPath } from '../nest-ext/nest-path/nest-path.type';
import { NEST_ARCHIVER } from '../nest-ext/nest-archiver/inject-token';
import { NEST_FS } from '../nest-ext/nest-fs/inject-token';
import { NEST_PATH } from '../nest-ext/nest-path/inject-token';
import { ReadStream } from 'typeorm/platform/PlatformTools';

describe('ZipperService', () => {
  let service: ZipperService;
  let archiver: jest.Mocked<NestArchiverDelegate>;
  let archive: Partial<NestArchiver> = {
    pipe: jest.fn(),
    append: jest.fn(),
    finalize: jest.fn(),
    on: jest.fn(),
  };
  let path: jest.Mocked<NestPath>;
  let fs: jest.Mocked<NestFS>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ZipperService)
      .mock(NEST_ARCHIVER)
      .using(jest.fn().mockReturnValue(archive))
      .compile();

    service = unit;
    archiver = unitRef.get(NEST_ARCHIVER);
    path = unitRef.get(NEST_PATH);
    fs = unitRef.get(NEST_FS);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('zip', () => {

    it('should return a ReadStream using sources as string', async () => {
      // Arrange
      const sources = ['file1.txt', 'file2.txt'];

      fs.createReadStream.mockReturnValue({} as ReadStream);
      path.basename.mockReturnValue('/path/to/file.txt');

      // Act
      const result = await service.zip(sources);

      // Assert
      expect(path.basename).toHaveBeenCalledTimes(sources.length);
      expect(fs.createReadStream).toHaveBeenCalledTimes(sources.length);
      expect(archiver).toHaveBeenCalledWith('zip', { zlib: { level: 9 } });
      expect(archive.pipe).toHaveBeenCalled();
      expect(archive.append).toHaveBeenCalledTimes(sources.length);
      expect(archive.finalize).toHaveBeenCalled();
      expect(result).toBeInstanceOf(PassThrough);
    });

    it('should return a ReadStream using sources as object', async () => {
      // Arrange
      const sources = [{ source: 'file1.txt', name: 'custom_file1.txt' }, { source: 'file2.txt', name: 'custom_file2.txt' }];

      // Act
      const result = await service.zip(sources);

      // Assert
      expect(fs.createReadStream).toHaveBeenCalledTimes(sources.length);
      expect(path.basename).not.toHaveBeenCalled();
      expect(archive.pipe).toHaveBeenCalled();
      expect(archive.append).toHaveBeenCalledTimes(sources.length);
      expect(archive.finalize).toHaveBeenCalled();
      expect(result).toBeInstanceOf(PassThrough);
    });
  });
});