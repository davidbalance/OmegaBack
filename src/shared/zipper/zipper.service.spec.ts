import { ZipperService } from './zipper.service';
import { PassThrough } from 'stream';
import { TestBed } from '@automock/jest';
import { Archiver, ArchiverDelegate } from '../nest-ext/archiver/archiver.type';
import { Path } from '../nest-ext/path/path.type';
import { NEST_ARCHIVER } from '../nest-ext/archiver/inject-token';
import { NEST_PATH } from '../nest-ext/path/inject-token';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { FILE_SYSTEM } from '../file-system/inject-token';
import { IFileSystem } from '../file-system/file-system.interface';

describe('ZipperService', () => {
  let service: ZipperService;
  let archiver: jest.Mocked<ArchiverDelegate>;
  let archive: Partial<Archiver> = {
    pipe: jest.fn(),
    append: jest.fn(),
    finalize: jest.fn(),
    on: jest.fn(),
  };
  let path: jest.Mocked<Path>;
  let fileSystem: jest.Mocked<IFileSystem>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ZipperService)
      .mock(NEST_ARCHIVER)
      .using(jest.fn().mockReturnValue(archive))
      .compile();

    service = unit;
    archiver = unitRef.get(NEST_ARCHIVER);
    path = unitRef.get(NEST_PATH);
    fileSystem = unitRef.get(FILE_SYSTEM);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('zip', () => {

    it('should return a ReadStream using sources as string', async () => {
      // Arrange
      const sources = ['file1.txt', 'file2.txt'];

      fileSystem.read.mockResolvedValue(Buffer.from('Test file'));
      path.basename.mockReturnValue('/path/to/file.txt');

      // Act
      const result = await service.zip(sources);

      // Assert
      expect(path.basename).toHaveBeenCalledTimes(sources.length);
      expect(fileSystem.read).toHaveBeenCalledTimes(sources.length);
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
      expect(fileSystem.read).toHaveBeenCalledTimes(sources.length);
      expect(path.basename).not.toHaveBeenCalled();
      expect(archive.pipe).toHaveBeenCalled();
      expect(archive.append).toHaveBeenCalledTimes(sources.length);
      expect(archive.finalize).toHaveBeenCalled();
      expect(result).toBeInstanceOf(PassThrough);
    });
  });
});