/* eslint-disable @typescript-eslint/unbound-method */
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { ModelRepository } from "@shared/shared/providers";
import { OrderFindOneQuery, OrderFindOneQueryPayload } from "../order.find-one.query";

describe("OrderFindOneQuery", () => {
    let repository: jest.Mocked<ModelRepository<OrderModel>>;
    let handler: OrderFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<OrderModel>>;

        handler = new OrderFindOneQuery(repository);
    });

    it("should return an order model when the order exists", async () => {
        const mockOrder = { orderId: "order123", patientName: "John Doe", status: "pending" } as unknown as OrderModel;

        repository.findOneAsync.mockResolvedValue(mockOrder);

        const query: OrderFindOneQueryPayload = {
            orderId: "order123",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "orderId", operator: "eq", value: query.orderId },
        ]);
        expect(result).toEqual(mockOrder);
    });

    it("should throw an OrderNotFoundError when the order does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: OrderFindOneQueryPayload = {
            orderId: "order123",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(OrderNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "orderId", operator: "eq", value: query.orderId },
        ]);
    });
});
