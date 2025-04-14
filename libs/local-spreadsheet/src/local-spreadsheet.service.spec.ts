/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalSpreadsheetService } from './local-spreadsheet.service';
import { Workbook, Worksheet } from 'exceljs';
import { SpreadsheetWorkbook } from '@shared/shared/providers';
import { InternalError } from '@shared/shared/domain/error';
import { Logger } from '@nestjs/common';

jest.mock('exceljs', () => ({
  Workbook: jest.fn().mockImplementation(() => ({
    addWorksheet: jest.fn().mockReturnValue({
      getRow: jest.fn().mockReturnValue({ getCell: jest.fn().mockReturnValue({}) }),
      getColumn: jest.fn().mockReturnValue({ letter: 'A' }),
      mergeCells: jest.fn(),
    }),
    worksheets: [{ eachRow: jest.fn() }],
    xlsx: { load: jest.fn(), writeBuffer: jest.fn() },
  })),
}));


describe('LocalSpreadsheetService', () => {
  let service: LocalSpreadsheetService;
  let WorkbookMock: jest.MockedClass<typeof Workbook>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });

    WorkbookMock = Workbook as jest.MockedClass<typeof Workbook>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalSpreadsheetService],
    }).compile();

    service = module.get<LocalSpreadsheetService>(LocalSpreadsheetService);
  });

  describe('read', () => {
    it('should read spreadsheet data correctly', async () => {
      const mockBuffer = Buffer.from('test data');
      const mockWorksheet = {
        eachRow: jest.fn((callback) => {
          callback({ values: ['Name', 'Age'] });
          callback({ values: ['John', 30] });
        }),
      } as unknown as Worksheet;

      const workbookMock = new Workbook();
      workbookMock.worksheets = [mockWorksheet];
      WorkbookMock.mockImplementation(() => workbookMock);

      const result = await service.read(mockBuffer);
      expect(result).toEqual([
        ['Name', 'Age'],
        ['John', 30],
      ]);
    });
  });

  describe('craft', () => {
    it('should create a spreadsheet and return a buffer', async () => {
      const data = [[{ value: 'Name' }, { value: 'Age' }], [{ value: 'John' }, { value: 30 }]];
      const mockBuffer = Buffer.from('mock buffer');

      const mockWorksheet = {
        getRow: jest.fn().mockReturnValue({ getCell: jest.fn().mockReturnValue({ style: {} }) }),
        getColumn: jest.fn().mockReturnValue({ letter: 'A' }),
        mergeCells: jest.fn(),
      } as unknown as Worksheet;

      const workbookMock = new Workbook();
      workbookMock.addWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      workbookMock.xlsx.writeBuffer = jest.fn().mockResolvedValue(mockBuffer);
      WorkbookMock.mockImplementation(() => workbookMock);

      const result = await service.craft(data);
      expect(result).toBe(mockBuffer);
      expect(mockWorksheet.getRow).toHaveBeenCalled();
      expect(workbookMock.xlsx.writeBuffer).toHaveBeenCalled();
    });

    it('should throw an InternalError when crafting fails', async () => {
      const data = [[{ value: 'John' }]];
      const error = new Error('Crafting failed');
      const workbookMock = new Workbook();
      workbookMock.xlsx.writeBuffer = jest.fn().mockRejectedValue(error);
      WorkbookMock.mockImplementation(() => workbookMock);

      await expect(service.craft(data)).rejects.toThrow(InternalError);
    });

    it('should apply text rotation for vertical text', async () => {
      const data: SpreadsheetWorkbook = [[{ value: 'Vertical Text', position: 'vertical' }]];
      const mockWorksheet = {
        getRow: jest.fn().mockReturnValue({
          getCell: jest.fn().mockReturnValue({ style: {}, alignment: {} })
        }),
        getColumn: jest.fn().mockReturnValue({ letter: 'A' }),
        mergeCells: jest.fn(),
      } as unknown as Worksheet;

      const workbookMock = new Workbook();
      workbookMock.addWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      workbookMock.xlsx.writeBuffer = jest.fn().mockResolvedValue(Buffer.from('mock buffer'));
      WorkbookMock.mockImplementation(() => workbookMock);

      await service.craft(data);
      expect(mockWorksheet.getRow).toHaveBeenCalled();
      expect(mockWorksheet.getRow(1).getCell(1).alignment).toHaveProperty('textRotation', 90);
    });

    it('should merge cells correctly for colSpan and rowSpan', async () => {
      const data = [[{ value: 'Merged', colSpan: 2, rowSpan: 2 }]];
      const mockWorksheet = {
        getRow: jest.fn().mockReturnValue({ getCell: jest.fn().mockReturnValue({ style: {} }) }),
        getColumn: jest.fn().mockReturnValueOnce({ letter: 'A' }).mockReturnValueOnce({ letter: 'B' }),
        mergeCells: jest.fn(),
      } as unknown as Worksheet;

      const workbookMock = new Workbook();
      workbookMock.addWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      workbookMock.xlsx.writeBuffer = jest.fn().mockResolvedValue(Buffer.from('mock buffer'));
      WorkbookMock.mockImplementation(() => workbookMock);

      await service.craft(data);
      expect(mockWorksheet.mergeCells).toHaveBeenCalledWith('A1:B2');
    });
  });
});
