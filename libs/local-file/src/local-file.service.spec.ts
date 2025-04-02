import { Test, TestingModule } from '@nestjs/testing';
import { LocalFileService } from './local-file.service';
import { DiskToken } from './local-file.dependencies';
import { WriteStream } from 'fs';
import { FileNotFoundError } from '@shared/shared/providers';
import { Logger } from '@nestjs/common';
import { FileToken, FileType, PathToken, PathType } from '@shared/shared/common';
import { StorageError } from '@shared/shared/domain/error';

describe('LocalFileService', () => {
  let service: LocalFileService;
  let file: jest.Mocked<FileType>;
  let path: jest.Mocked<PathType>;
  let diskPath: string;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });

    file = {
      existsSync: jest.fn(),
      mkdirSync: jest.fn(),
      createWriteStream: jest.fn(),
      readFileSync: jest.fn(),
      unlinkSync: jest.fn(),
    } as unknown as jest.Mocked<FileType>;

    path = { join: jest.fn() } as unknown as jest.Mocked<PathType>;
    diskPath = '/mock/disk/path';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalFileService,
        { provide: FileToken, useValue: file },
        { provide: PathToken, useValue: path },
        { provide: DiskToken, useValue: diskPath },
      ],
    }).compile();
    service = module.get<LocalFileService>(LocalFileService);
  });

  describe('write', () => {
    it('should write a file successfully', async () => {
      const filepath = 'test/file';
      const filename = 'file.txt';
      const buffer = Buffer.from('test content');
      const outputPath = '/mock/disk/path/test/file';
      const savedPath = 'test/file/file.txt';

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(false);
      file.createWriteStream.mockReturnValue({
        write: jest.fn(),
        end: jest.fn(),
        on: jest.fn(),
      } as unknown as WriteStream);

      const result = await service.write(filepath, filename, buffer);

      expect(result).toBe(savedPath);
      expect(file.existsSync).toHaveBeenCalledWith(outputPath);
      expect(file.mkdirSync).toHaveBeenCalledWith(outputPath, { recursive: true });
      expect(file.createWriteStream).toHaveBeenCalledWith('/mock/disk/path/test/file/file.txt');
    });

    it('should handle error during file write', async () => {
      const filepath = 'test/file';
      const filename = 'file.txt';
      const buffer = Buffer.from('test content');
      const writeError = new Error('Write failed');

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(false);
      const writeStream = {
        write: jest.fn(),
        end: jest.fn(),
        on: jest.fn((event, callback: (value: any) => void) => {
          if (event === 'error') callback(writeError);
        }),
      } as unknown as WriteStream;
      file.createWriteStream.mockReturnValue(writeStream);

      await expect(service.write(filepath, filename, buffer)).rejects.toThrow(StorageError);
    });
  });

  describe('read', () => {
    it('should read a file successfully', async () => {
      const filepath = 'test/file/file.txt';
      const readpath = '/mock/disk/path/test/file/file.txt';
      const buffer = Buffer.from('file content');

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(true);
      file.readFileSync.mockReturnValue(buffer);

      const result = await service.read(filepath);

      expect(result).toEqual(buffer);
      expect(file.existsSync).toHaveBeenCalledWith(readpath);
      expect(file.readFileSync).toHaveBeenCalledWith(readpath);
    });

    it('should throw FileNotFoundError if the file does not exist', async () => {
      const filepath = 'test/file/file.txt';
      const readpath = '/mock/disk/path/test/file/file.txt';

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(false);

      await expect(service.read(filepath)).rejects.toThrow(new FileNotFoundError(readpath));
    });

    it('should handle error during file read', async () => {
      const filepath = 'test/file/file.txt';
      const readError = new Error('Read failed');

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(true);
      file.readFileSync.mockImplementation(() => {
        throw readError;
      });

      await expect(service.read(filepath)).rejects.toThrow(StorageError);
    });
  });

  describe('remove', () => {
    it('should remove a file successfully', async () => {
      const filepath = 'test/file/file.txt';
      const readpath = '/mock/disk/path/test/file/file.txt';

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(true);

      await service.remove(filepath);

      expect(file.existsSync).toHaveBeenCalledWith(readpath);
      expect(file.unlinkSync).toHaveBeenCalledWith(readpath);
    });

    it('should throw FileNotFoundError if the file does not exist', async () => {
      const filepath = 'test/file/file.txt';
      const readpath = '/mock/disk/path/test/file/file.txt';

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(false);

      await expect(service.remove(filepath)).rejects.toThrow(new FileNotFoundError(readpath));
    });

    it('should handle error during file remove', async () => {
      const filepath = 'test/file/file.txt';

      path.join.mockImplementation((...args) => args.join('/'));
      file.existsSync.mockReturnValue(true);
      file.unlinkSync.mockImplementation(() => {
        throw new Error('Remove failed');
      });

      await expect(service.remove(filepath)).rejects.toThrow(StorageError);
    });
  });
});
