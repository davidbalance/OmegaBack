/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalSpreadsheetService } from './local-spreadsheet.service';
import { Workbook } from 'exceljs';
import { SpreadsheetColumn } from '@shared/shared/providers';
import { InternalError } from '@shared/shared/domain/error';
import { Logger } from '@nestjs/common';

jest.mock('exceljs', () => ({
  Workbook: jest.fn().mockImplementation(() => ({
    addWorksheet: jest.fn(),
    xlsx: {
      writeBuffer: jest.fn(),
    },
  })),
}));

describe('LocalSpreadsheetService', () => {
  let service: LocalSpreadsheetService<any>;
  let WorkbookMock: jest.MockedClass<typeof Workbook>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });

    WorkbookMock = Workbook as jest.MockedClass<typeof Workbook>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalSpreadsheetService],
    }).compile();

    service = module.get<LocalSpreadsheetService<any>>(LocalSpreadsheetService);
  });

  describe('craft', () => {
    it('should craft a spreadsheet successfully and return buffer', async () => {
      const data = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
      const columns: SpreadsheetColumn<any>[] = [
        { header: 'Name', key: 'name' },
        { header: 'Age', key: 'age' },
      ];

      const mockBuffer = Buffer.from('mock buffer data');
      const workbookMock = {
        addWorksheet: jest.fn().mockReturnValue({
          columns: [],
          addRows: jest.fn()
        }),
        xlsx: {
          writeBuffer: jest.fn().mockResolvedValue(mockBuffer),
        },
      } as unknown as jest.Mocked<Workbook>;

      WorkbookMock.mockImplementation(() => workbookMock);
      const result = await service.craft(data, columns);

      expect(result).toBe(mockBuffer);
      expect(workbookMock.addWorksheet).toHaveBeenCalledWith('Book1');
      expect(workbookMock.xlsx.writeBuffer).toHaveBeenCalled();
    });

    it('should map columns correctly and use default worksheet name', async () => {
      const data = [{ name: 'John', age: 30 }];
      const columns: SpreadsheetColumn<any>[] = [
        { header: 'Name', key: 'name' },
        { header: 'Age', key: 'age' },
      ];

      const mockBuffer = Buffer.from('mock buffer data');
      const workbookMock = {
        addWorksheet: jest.fn().mockReturnValue({
          columns: [],
          addRows: jest.fn()
        }),
        xlsx: {
          writeBuffer: jest.fn().mockResolvedValue(mockBuffer),
        },
      } as unknown as jest.Mocked<Workbook>;

      WorkbookMock.mockImplementation(() => workbookMock);
      await service.craft(data, columns);

      expect(workbookMock.addWorksheet).toHaveBeenCalledWith('Book1');
      expect(workbookMock.xlsx.writeBuffer).toHaveBeenCalled();
    });

    it('should allow specifying a worksheet name', async () => {
      const data = [{ name: 'John', age: 30 }];
      const columns: SpreadsheetColumn<any>[] = [
        { header: 'Name', key: 'name' },
        { header: 'Age', key: 'age' },
      ];

      const mockBuffer = Buffer.from('mock buffer data');
      const workbookMock = {
        addWorksheet: jest.fn().mockReturnValue({
          columns: [],
          addRows: jest.fn()
        }),
        xlsx: {
          writeBuffer: jest.fn().mockResolvedValue(mockBuffer),
        },
      } as unknown as jest.Mocked<Workbook>;

      WorkbookMock.mockImplementation(() => workbookMock);
      await service.craft(data, columns, 'CustomSheet');

      expect(workbookMock.addWorksheet).toHaveBeenCalledWith('CustomSheet');
    });

    it('should throw an InternalError if spreadsheet creation fails', async () => {
      const data = [{ name: 'John', age: 30 }];
      const columns: SpreadsheetColumn<any>[] = [
        { header: 'Name', key: 'name' },
        { header: 'Age', key: 'age' },
      ];

      const error = new Error('Spreadsheet creation failed');
      const workbookMock = {
        addWorksheet: jest.fn().mockReturnValue({
          columns: [],
          addRows: jest.fn()
        }),
        xlsx: {
          writeBuffer: jest.fn().mockRejectedValue(error),
        },
      } as unknown as jest.Mocked<Workbook>;

      WorkbookMock.mockImplementation(() => workbookMock);

      await expect(service.craft(data, columns)).rejects.toThrow(InternalError);
    });
  });
});
