/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { OrderCreatedStatusCommand } from "../order-created-status.command";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { Order } from "@omega/medical/core/domain/order/order.domain";

describe("OrderCreatedStatusCommand", () => {
    let repository: jest.Mocked<OrderRepository>;
    let commandHandler: OrderCreatedStatusCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        commandHandler = new OrderCreatedStatusCommand(repository);
    });

    it("should successfully change order status to 'created' when order is found", async () => {
        const orderId = "order-1";
        const order = {
            id: orderId,
            changeStatusCreated: jest.fn(),
        } as unknown as Order;

        repository.findOneAsync.mockResolvedValue(order);
        repository.saveAsync.mockResolvedValue(undefined);

        await commandHandler.handleAsync({ orderId });

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: orderId }]
        });
        expect(order.changeStatusCreated).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(order);
    });

    it("should throw an error when order is not found", async () => {
        const orderId = "order-1";

        repository.findOneAsync.mockResolvedValue(null);

        await expect(commandHandler.handleAsync({ orderId })).rejects.toThrow(OrderNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: orderId }]
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
