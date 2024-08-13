import { TestBed } from '@automock/jest';
import { ExcelManagerService } from './excel-manager.service';
import { Workbook } from 'exceljs';
import { StreamableFile } from '@nestjs/common';
import { PassThrough } from 'stream';

const workbookImplementation = {
  addWorksheet: jest.fn().mockReturnValue({
    columns: [],
    addRows: jest.fn(),
  }),
  xlsx: {
    write: jest.fn().mockImplementation((stream: any) => {
      stream.end();
      return Promise.resolve();
    }),
  },
}

jest.mock('exceljs', () => ({
  Workbook: jest.fn().mockImplementation(() => (workbookImplementation))
}));

describe('ExcelManagerService', () => {
  let service: ExcelManagerService;
  let workbookMock: jest.Mocked<Workbook>;

  beforeEach(async () => {
    const { unit } = TestBed.create(ExcelManagerService).compile();
    service = unit;

    workbookMock = new Workbook() as jest.Mocked<Workbook>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('craft', () => {
    const data = [{ id: 1, name: 'Test' }];
    const columns: any[] = [{ header: 'ID', key: 'id' }, { header: 'Name', key: 'name' }];

    it('should create a worksheet with the correct name', async () => {
      // Arrange
      const filename = 'Test Sheet';

      // Act
      await service.craft(data, columns, filename);

      // Assert
      expect(workbookImplementation.addWorksheet).toHaveBeenCalledWith(filename);
      expect(workbookImplementation.addWorksheet().columns).toEqual(columns);
      expect(workbookImplementation.addWorksheet().addRows).toHaveBeenCalledWith(data);
    });

    it('should return a StreamableFile', async () => {
      // Act
      const result = await service.craft(data, columns);

      // Assert
      expect(workbookImplementation.xlsx.write).toHaveBeenCalled();
      expect(result).toBeInstanceOf(StreamableFile);
    });

    it('should correctly handle stream piping', async () => {
      // Arrange
      const mockStream = new PassThrough();

      jest.spyOn(PassThrough.prototype, 'pipe').mockReturnValue(mockStream);

      // Act
      const result = await service.craft(data, columns);

      // Assert
      expect(workbookImplementation.xlsx.write).toHaveBeenCalledWith(expect.any(PassThrough));
      expect(result).toBeInstanceOf(StreamableFile);
    });
  });
});