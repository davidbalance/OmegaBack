/* eslint-disable @typescript-eslint/unbound-method */
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { ModelRepository } from "@shared/shared/providers";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { OrderChecklistGetFileQuery, OrderChecklistGetFileQueryImpl, OrderChecklistGetFileQueryPayload } from "../order-checklist-get-file.query";

describe("OrderChecklistGetFileQuery", () => {
    let repository: jest.Mocked<ModelRepository<OrderChecklistModel>>;
    let pdfProvider: jest.Mocked<PdfProvider>;
    let parserFunc: jest.Mock;
    const templatePath: string = "/path/to/template.template"
    let handler: OrderChecklistGetFileQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<OrderChecklistModel>>;

        pdfProvider = {
            craft: jest.fn(),
        } as unknown as jest.Mocked<PdfProvider>;

        parserFunc = jest.fn();

        handler = new OrderChecklistGetFileQueryImpl(repository, pdfProvider, templatePath, parserFunc);
    });

    it("should return a PDF buffer when order checklists are found", async () => {
        const mockOrderChecklists = [
            { orderId: "order123", checklistItem: "Item 1" },
            { orderId: "order123", checklistItem: "Item 2" },
        ] as unknown as OrderChecklistModel[];

        const mockLayout = "mocked layout";
        const mockPdfBuffer = Buffer.from("mocked PDF");

        repository.findManyAsync.mockResolvedValue(mockOrderChecklists);
        parserFunc.mockReturnValue(mockLayout);
        pdfProvider.craft.mockResolvedValue(mockPdfBuffer);

        const query: OrderChecklistGetFileQueryPayload = {
            orderId: "order123",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "orderId", operator: "eq", value: query.orderId }],
        });
        expect(parserFunc).toHaveBeenCalledWith(mockOrderChecklists);
        expect(pdfProvider.craft).toHaveBeenCalled();
        expect(result).toEqual(mockPdfBuffer);
    });

    it("should throw OrderNotFoundError when no order checklists are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const query: OrderChecklistGetFileQueryPayload = {
            orderId: "order123",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(OrderNotFoundError);
        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "orderId", operator: "eq", value: query.orderId }],
        });
        expect(pdfProvider.craft).not.toHaveBeenCalled();
    });
});
