import { TestBed } from '@automock/jest';
import { PdfManagerService } from './pdf-manager.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const mockOn = jest.fn();
const mockEnd = jest.fn();
const pdfmake = {
    createPdfKitDocument: jest.fn().mockImplementation(() => ({
        on: mockOn,
        end: mockEnd,
    })),
};

jest.mock('pdfmake', () => jest.fn().mockImplementation(() => pdfmake));

jest.mock('html-to-pdfmake', () => jest.fn().mockReturnValue({
    content: 'mocked-content',
}));

jest.mock('jsdom', () => ({
    JSDOM: jest.fn().mockImplementation(() => { }),
}));

describe('PdfManagerService', () => {
    let service: PdfManagerService;

    beforeEach(async () => {
        const { unit } = TestBed.create(PdfManagerService).compile();
        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('craft', () => {
        const mockContent: TDocumentDefinitions = {
            content: 'mocked-content',
        };

        it('should create a pdf document', async () => {
            // Arrange
            mockOn.mockImplementation((event, callback) => {
                if (event === 'data') {
                    callback(Buffer.from('mocked-chunk'));
                }
                if (event === 'end') {
                    callback();
                }
            });

            // Act
            await service.craft(mockContent);

            // Assert
            expect(pdfmake.createPdfKitDocument).toHaveBeenCalledWith(mockContent);
            expect(mockOn).toHaveBeenNthCalledWith(1, 'data', expect.any(Function));
            expect(mockOn).toHaveBeenNthCalledWith(2, 'end', expect.any(Function));
            expect(mockOn).toHaveBeenNthCalledWith(3, 'error', expect.any(Function));
            expect(mockEnd).toHaveBeenCalled();
        });

        it('should return a buffer', async () => {
            // Arrange
            const mockChunk = Buffer.from('mocked-chunk');
            const mockChunks = [mockChunk];

            mockOn.mockImplementation((event, callback) => {
                if (event === 'data') {
                    callback(mockChunk);
                }
                if (event === 'end') {
                    callback();
                }
            });

            // Act
            const result = await service.craft(mockContent);

            // Assert
            expect(result).toEqual(Buffer.concat(mockChunks));
        });
    });

    describe("parseHtml", () => {
        const mockContent = "<html>mocked-html</html>";

        it("should parse html to pdfmake content", () => {
            // Act
            const result = service.parseHtml(mockContent);

            // Assert
            expect(result).toEqual({ content: "mocked-content" });
        });
    });
});
