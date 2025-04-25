/* eslint-disable @typescript-eslint/unbound-method */
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { OrderFindOneByExternalKeyQuery, OrderFindOneByExternalKeyQueryImpl, OrderFindOneByExternalKeyQueryPayload } from "../order.find-one-by-external-key.query";
import { OrderExternalConnectionRepository, OrderRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

describe("OrderFindOneByExternalKeyQuery", () => {
    let externalConnectionRepository: jest.Mocked<OrderExternalConnectionRepository>;
    let modelRepository: jest.Mocked<OrderRepository>;
    let handler: OrderFindOneByExternalKeyQuery;

    beforeEach(() => {
        externalConnectionRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalConnectionRepository>;

        modelRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        handler = new OrderFindOneByExternalKeyQueryImpl(externalConnectionRepository, modelRepository);
    });

    it("Should return an order model when the order exists", async () => {
        const mockExternalConnection = { orderId: "order123" } as unknown as OrderExternalConnectionModel;
        const mockOrder = { orderId: "order123", patientName: "John Doe", status: "pending" } as unknown as OrderModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(mockOrder);

        const query: OrderFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        const result = await handler.handleAsync(query);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: mockExternalConnection.orderId }
        ]);
        expect(result).toEqual(mockOrder);
    });

    it("Should throw OrderExternalKeyNotFoundError when no external key mapping is found", async () => {
        externalConnectionRepository.findOneAsync.mockResolvedValue(null);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: OrderFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(OrderExternalKeyNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).not.toHaveBeenCalled();
    });

    it("Should throw OrderNotFoundError when the external key exists but the order does not", async () => {
        const mockExternalConnection = { orderId: "order123" } as unknown as OrderExternalConnectionModel;

        externalConnectionRepository.findOneAsync.mockResolvedValue(mockExternalConnection);
        modelRepository.findOneAsync.mockResolvedValue(null);

        const query: OrderFindOneByExternalKeyQueryPayload = {
            owner: "order-owner",
            value: "order-id",
        };

        await expect(handler.handleAsync(query)).rejects.toThrow(OrderNotFoundError);

        expect(externalConnectionRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalOwner', operator: 'eq', value: query.owner },
            { field: 'orderExternalKey', operator: 'eq', value: query.value },
        ]);
        expect(modelRepository.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderId', operator: 'eq', value: mockExternalConnection.orderId }
        ]);
    });
});
