/* eslint-disable @typescript-eslint/unbound-method */
import { SpreadsheetProvider } from "@shared/shared/providers";
import { MassiveLoadTemplate, massiveLoadTemplateSpreadsheet, OrderFindMassiveLoadTemplateQuery, spreadsheetData } from "../order-find-massive-load-template.query";

describe("OrderFindMassiveLoadTemplateQuery", () => {
    let spreadsheet: jest.Mocked<SpreadsheetProvider<MassiveLoadTemplate>>;
    let handler: OrderFindMassiveLoadTemplateQuery;

    beforeEach(() => {
        spreadsheet = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<SpreadsheetProvider<MassiveLoadTemplate>>;

        handler = new OrderFindMassiveLoadTemplateQuery(spreadsheet);
    });

    it('should craft the spreadsheet correctly and return a Buffer', async () => {
        const mockBuffer = Buffer.from('spreadsheet content');
        spreadsheet.craft.mockResolvedValue(mockBuffer);

        const result = await handler.handleAsync();

        expect(spreadsheet.craft).toHaveBeenCalledWith(
            expect.arrayContaining(spreadsheetData),
            massiveLoadTemplateSpreadsheet
        );

        expect(result).toBe(mockBuffer);
    });
});
