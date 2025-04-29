/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { OrderValidatedStatusCommand, OrderValidatedStatusCommandImpl } from "../order-validated-status.command";

describe("OrderValidatedStatusCommand", () => {
    let repository: jest.Mocked<OrderRepository>;
    let commandHandler: OrderValidatedStatusCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        commandHandler = new OrderValidatedStatusCommandImpl(repository);
    });

    it("should successfully change order status to 'created' when order is found", async () => {
        const orderId = "order-1";
        const order = {
            id: orderId,
            changeStatusValidated: jest.fn(),
        } as unknown as Order;

        repository.findOneAsync.mockResolvedValue(order);
        repository.saveAsync.mockResolvedValue(undefined);

        await commandHandler.handleAsync({ orderId });

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: orderId }]
        });
        expect(order.changeStatusValidated).toHaveBeenCalled();
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
