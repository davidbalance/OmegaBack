/* eslint-disable @typescript-eslint/unbound-method */
import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";
import { ModelRepository } from "@shared/shared/providers";
import { OrderYearFindManyQuery } from "../order-year.find-many.query";

describe("OrderYearFindManyQuery", () => {
    let repository: jest.Mocked<ModelRepository<OrderYearModel>>;
    let handler: OrderYearFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ModelRepository<OrderYearModel>>;

        handler = new OrderYearFindManyQuery(repository);
    });

    it("should return a list of order year models", async () => {
        const mockOrderYears = [
            { year: 2021, orderCount: 10 },
            { year: 2022, orderCount: 20 },
        ] as unknown as OrderYearModel[];

        repository.findManyAsync.mockResolvedValue(mockOrderYears);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual(mockOrderYears);
    });

    it("should return an empty list when no order year models are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([]);
    });
});
