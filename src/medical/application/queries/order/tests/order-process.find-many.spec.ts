/* eslint-disable @typescript-eslint/unbound-method */
import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";
import { ModelRepository } from "@shared/shared/providers";
import { OrderProcessFindManyQuery, OrderProcessFindManyQueryImpl } from "../order-process.find-many.query";

describe("OrderProcessFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<OrderProcessModel>>;
    let handler: OrderProcessFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<OrderProcessModel>>;

        handler = new OrderProcessFindManyQueryImpl(repository);
    });

    it("should return a list of order process models", async () => {
        const mockOrderProcesses = [
            { orderId: "order123", status: "pending" },
            { orderId: "order124", status: "completed" },
        ] as unknown as OrderProcessModel[];

        repository.findManyAsync.mockResolvedValue(mockOrderProcesses);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual(mockOrderProcesses);
    });

    it("should return an empty list when no order process models are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([]);
    });
});
