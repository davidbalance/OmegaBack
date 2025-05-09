/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { OrderUpdateProcessCommand, OrderUpdateProcessCommandImpl, OrderUpdateProcessCommandPayload } from "../order-update-process.command";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";

describe("OrderUpdateProcessCommand", () => {
    let repository: jest.Mocked<OrderRepository>;
    let commandHandler: OrderUpdateProcessCommand;

    beforeEach(() => {
        repository = {
            saveAsync: jest.fn(),
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        commandHandler = new OrderUpdateProcessCommandImpl(repository);
    });

    it("should successfully an order process", async () => {
        const orderPayload: OrderUpdateProcessCommandPayload = {
            orderId: "order-id-123",
            process: "test-process"
        };

        const mockedOrder = { changeProcess: jest.fn() } as unknown as Order;

        repository.findOneAsync.mockResolvedValue(mockedOrder);

        await commandHandler.handleAsync(orderPayload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: orderPayload.orderId }] });
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw an error when patient is not found", async () => {
        const orderPayload: OrderUpdateProcessCommandPayload = {
            orderId: "order-id-123",
            process: "test-process"
        };


        repository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync(orderPayload)).rejects.toThrow(OrderNotFoundError);
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
