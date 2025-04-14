/* eslint-disable @typescript-eslint/unbound-method */
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { ModelRepository } from "@shared/shared/providers";
import { OrderChecklistFindManyQuery, OrderChecklistFindManyQueryPayload } from "../order-checklist-find-many.query";

describe("OrderChecklistFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<OrderChecklistModel>>;
    let handler: OrderChecklistFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<OrderChecklistModel>>;

        handler = new OrderChecklistFindManyQuery(repository);
    });

    it("should return a list of order checklist models when order exists", async () => {
        const mockOrderChecklists = [
            { orderId: "order123", checklistItem: "Item 1" },
            { orderId: "order123", checklistItem: "Item 2" },
        ] as unknown as OrderChecklistModel[];

        repository.findManyAsync.mockResolvedValue(mockOrderChecklists);

        const query: OrderChecklistFindManyQueryPayload = {
            orderId: "order123",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "orderId", operator: "eq", value: query.orderId }],
        });
        expect(result).toEqual(mockOrderChecklists);
    });

    it("should return an empty list when no order checklists are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const query: OrderChecklistFindManyQueryPayload = {
            orderId: "order123",
        };

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [{ field: "orderId", operator: "eq", value: query.orderId }],
        });
        expect(result).toEqual([]);
    });
});
