import { ZipperService } from './zipper.service';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { PassThrough } from 'stream';
import { StreamableFile } from '@nestjs/common';
import { TestBed } from '@automock/jest';

jest.mock('fs');
jest.mock('path');
jest.mock('archiver');

describe('ZipperService', () => {
  let service: ZipperService;

  beforeEach(() => {
    const { unit } = TestBed.create(ZipperService).compile();
    service = unit;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('zip', () => {
    it('should return a StreamableFile', async () => {
      const sources = ['file1.txt', 'file2.txt'];

      (path.basename as jest.Mock).mockImplementation((source) => source.split('/').pop());
      (fs.createReadStream as jest.Mock).mockImplementation(() => new PassThrough());

      const mockArchive = {
        append: jest.fn(),
        pipe: jest.fn(),
        finalize: jest.fn(),
        on: jest.fn(),
      };

      (archiver as unknown as jest.Mock).mockReturnValue(mockArchive);

      const result = await service.zip(sources);

      expect(result).toBeInstanceOf(StreamableFile);
      expect(path.basename).toHaveBeenCalledTimes(sources.length);
      expect(fs.createReadStream).toHaveBeenCalledTimes(sources.length);
      expect(archiver).toHaveBeenCalledWith('zip', { zlib: { level: 9 } });
      expect(mockArchive.pipe).toHaveBeenCalled();
      expect(mockArchive.append).toHaveBeenCalledTimes(sources.length);
      expect(mockArchive.finalize).toHaveBeenCalled();
    });
  });
});