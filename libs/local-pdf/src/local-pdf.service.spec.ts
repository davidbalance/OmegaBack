/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalPdfService } from './local-pdf.service';
import PdfPrinter from 'pdfmake';
import { PdfToken } from './local-pdf.dependencies';
import { InternalError } from '@shared/shared/domain/error';
import { Logger } from '@nestjs/common';

jest.mock('pdfmake', () => ({
  createPdfKitDocument: jest.fn(),
}));

describe('LocalPdfService', () => {
  let service: LocalPdfService;
  let pdf: jest.Mocked<PdfPrinter>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });
    
    pdf = {
      createPdfKitDocument: jest.fn(),
    } as unknown as jest.Mocked<PdfPrinter>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalPdfService,
        { provide: PdfToken, useValue: pdf },
      ],
    }).compile();

    service = module.get<LocalPdfService>(LocalPdfService);
  });

  describe('craft', () => {
    it('should craft a PDF document successfully', async () => {
      const data = { content: 'Sample PDF content' };
      const chunk1 = Buffer.from('Chunk1');
      const chunk2 = Buffer.from('Chunk2');
      const expectedBuffer = Buffer.concat([chunk1, chunk2]);

      const doc = {
        on: jest.fn((event, callback: (value?: any) => void) => {
          if (event === 'data') {
            callback(chunk1);
            callback(chunk2);
          }
          if (event === 'end') {
            callback();
          }
          return doc;
        }),
        end: jest.fn(),
      } as unknown as PDFKit.PDFDocument;

      pdf.createPdfKitDocument.mockReturnValue(doc);

      const result = await service.craft(data);

      expect(result).toEqual(expectedBuffer);
      expect(pdf.createPdfKitDocument).toHaveBeenCalledWith(data);
      expect(doc.on).toHaveBeenCalledWith('data', expect.any(Function));
      expect(doc.on).toHaveBeenCalledWith('end', expect.any(Function));
      expect(doc.end).toHaveBeenCalled();
    });

    it('should handle error during PDF crafting', async () => {
      const data = { content: 'Sample PDF content' };
      const error = new Error('PDF creation failed');
      const doc = {
        on: jest.fn((event, callback: (value?: any) => void) => {
          if (event === 'error') {
            callback(error);
          }
          return doc;
        }),
        end: jest.fn(),
      } as unknown as PDFKit.PDFDocument;

      pdf.createPdfKitDocument.mockReturnValue(doc);


      await expect(service.craft(data)).rejects.toThrow(InternalError);
      expect(pdf.createPdfKitDocument).toHaveBeenCalledWith(data);
      expect(doc.on).toHaveBeenCalledWith('error', expect.any(Function));
      expect(doc.end).toHaveBeenCalled();
    });
  });
});