/* eslint-disable @typescript-eslint/unbound-method */
import { SpreadsheetProvider } from "@shared/shared/providers";
import { OrderFindMassiveLoadTemplateQuery } from "../order-find-massive-load-template.query";
import { ExamColumnProvider } from "@omega/medical/application/providers/exam-column.provider";

describe("OrderFindMassiveLoadTemplateQuery", () => {
    let spreadsheet: jest.Mocked<SpreadsheetProvider>;
    let provider: jest.Mocked<ExamColumnProvider>;
    let handler: OrderFindMassiveLoadTemplateQuery;

    beforeEach(() => {
        spreadsheet = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<SpreadsheetProvider>;

        provider = {
            find: jest.fn(),
        } as unknown as jest.Mocked<ExamColumnProvider>;

        handler = new OrderFindMassiveLoadTemplateQuery(spreadsheet, provider);
    });

    it('should craft the spreadsheet correctly and return a Buffer', async () => {
        const mockedBuffer = Buffer.from("Test value");

        provider.find.mockResolvedValue([{
            value: 'sample',
            children: [
                { value: 'sample', children: ['sample', 'sample'] }
            ]
        }]);
        spreadsheet.craft.mockResolvedValueOnce(mockedBuffer);

        const result = await handler.handleAsync();
        expect(result).toEqual(mockedBuffer);
        expect(spreadsheet.craft).toHaveBeenCalled();
    });
});
