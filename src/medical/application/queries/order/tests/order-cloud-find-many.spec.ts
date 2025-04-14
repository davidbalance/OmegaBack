/* eslint-disable @typescript-eslint/unbound-method */
import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";
import { ModelRepository } from "@shared/shared/providers";
import { OrderCloudFindManyQuery, OrderCloudFindManyQueryPayload } from "../order-cloud-find-many.query";

describe("OrderCloudFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<OrderCloudFileModel>>;
    let handler: OrderCloudFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<OrderCloudFileModel>>;

        handler = new OrderCloudFindManyQuery(repository);
    });

    it("should return a list of order cloud files when order exists", async () => {
        const mockOrderCloudFiles = [
            { orderId: "order123", fileName: "file1.txt" },
            { orderId: "order123", fileName: "file2.txt" },
        ] as unknown as OrderCloudFileModel[];

        repository.findManyAsync.mockResolvedValue(mockOrderCloudFiles);

        const query: OrderCloudFindManyQueryPayload = {
            orderId: "order123",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "orderId", operator: "eq", value: query.orderId }],
        });
        expect(result).toEqual(mockOrderCloudFiles);
    });

    it("should return an empty list when no order cloud files are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const query: OrderCloudFindManyQueryPayload = {
            orderId: "order123",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "orderId", operator: "eq", value: query.orderId }],
        });
        expect(result).toEqual([]);
    });
});
