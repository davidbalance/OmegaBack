/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderFindManyQuery, OrderFindManyQueryPayload } from "../order.find-many.query";
import { OrderModel } from "@omega/medical/core/model/order/order.model";

describe("OrderFindManyQuery", () => {
    let repository: jest.Mocked<OrderRepository>;
    let queryHandler: OrderFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        queryHandler = new OrderFindManyQuery(repository);
    });

    it("should fetch order data based on patientDni and optional filter", async () => {
        const queryPayload: OrderFindManyQueryPayload = {
            patientDni: "patient-123",
            filter: "urgent",
            skip: 0,
            limit: 10,
            order: { orderEmissionDate: "desc" },
        };

        const mockData: OrderModel[] = [
            { id: "1", patientDni: "patient-123", orderProcess: "urgent", orderEmissionDate: new Date() },
            { id: "2", patientDni: "patient-123", orderProcess: "urgent", orderEmissionDate: new Date() }
        ] as unknown as OrderModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: 'patientDni', operator: 'eq', value: queryPayload.patientDni },
                { field: 'orderProcess', operator: 'like', value: queryPayload.filter },
            ],
            skip: queryPayload.skip,
            limit: queryPayload.limit,
            order: { orderEmissionDate: 'desc' }
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });

    it("should return empty array if no matching data found", async () => {
        const queryPayload: OrderFindManyQueryPayload = {
            patientDni: "patient-123",
            filter: "non-existent-filter",
            skip: 0,
            limit: 10,
            order: { orderEmissionDate: "desc" },
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(result.data).toEqual([]);
        expect(result.amount).toBe(0);
        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: 'patientDni', operator: 'eq', value: queryPayload.patientDni },
                { field: 'orderProcess', operator: 'like', value: queryPayload.filter },
            ],
            skip: queryPayload.skip,
            limit: queryPayload.limit,
            order: { orderEmissionDate: 'desc' }
        });
    });

    it("should handle case with no filter", async () => {
        const queryPayload: OrderFindManyQueryPayload = {
            patientDni: "patient-123",
            filter: "",
            skip: 0,
            limit: 10,
            order: { orderEmissionDate: "desc" },
        };

        const mockData: OrderModel[] = [
            { id: "1", patientDni: "patient-123", orderProcess: "regular", orderEmissionDate: new Date() },
        ] as unknown as OrderModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: 'patientDni', operator: 'eq', value: queryPayload.patientDni },
            ],
            skip: queryPayload.skip,
            limit: queryPayload.limit,
            order: { orderEmissionDate: 'desc' }
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });

    it("should handle case with no companyRuc", async () => {
        const queryPayload: OrderFindManyQueryPayload = {
            patientDni: "patient-123",
            companyRuc: "123456789001",
            skip: 0,
            limit: 10,
            order: { orderEmissionDate: "desc" },
        };

        const mockData: OrderModel[] = [
            { id: "1", patientDni: "patient-123", orderProcess: "regular", orderEmissionDate: new Date() },
        ] as unknown as OrderModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            filter: [
                { field: 'patientDni', operator: 'eq', value: queryPayload.patientDni },
                { field: 'companyRuc', operator: 'eq', value: queryPayload.companyRuc },
            ],
            skip: queryPayload.skip,
            limit: queryPayload.limit,
            order: { orderEmissionDate: 'desc' }
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });
});
