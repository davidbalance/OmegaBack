/* eslint-disable @typescript-eslint/unbound-method */
import { OrderPatientRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderPatientFindManyQuery, OrderPatientFindManyQueryImpl, OrderPatientFindManyQueryPayload } from "../order-patient.find-many.query";
import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";

describe("OrderPatientFindManyQuery", () => {
    let repository: jest.Mocked<OrderPatientRepository>;
    let handler: OrderPatientFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderPatientRepository>;

        handler = new OrderPatientFindManyQueryImpl(repository);
    });

    it("should fetch order patient data based on filter", async () => {
        const query: OrderPatientFindManyQueryPayload = {
            filter: "John",
            skip: 0,
            limit: 10,
            order: { patientDni: "asc" }
        };

        const mockData: OrderPatientModel[] = [
            { id: "1", patientDni: "patient-123", patientName: "John", patientLastname: "Doe", locationCompanyRuc: "RUC-123", locationCompanyName: "Company A" },
            { id: "2", patientDni: "patient-456", patientName: "John", patientLastname: "Smith", locationCompanyRuc: "RUC-123", locationCompanyName: "Company A" }
        ] as unknown as OrderPatientModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{
                operator: "or",
                filter: [
                    { field: 'locationCompanyRuc', operator: 'like', value: query.filter },
                    { field: 'locationCompanyName', operator: 'like', value: query.filter },
                    { field: 'patientName', operator: 'like', value: query.filter },
                    { field: 'patientLastname', operator: 'like', value: query.filter },
                    { field: 'patientDni', operator: 'like', value: query.filter },
                ]
            }]
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });

    it("should return empty array if no matching data found", async () => {
        const query: OrderPatientFindManyQueryPayload = {
            filter: "non-existent-filter",
            skip: 0,
            limit: 10,
            order: { patientDni: "asc" }
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await handler.handleAsync(query);

        expect(result.data).toEqual([]);
        expect(result.amount).toBe(0);
        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [{
                operator: "or",
                filter: [
                    { field: 'locationCompanyRuc', operator: 'like', value: query.filter },
                    { field: 'locationCompanyName', operator: 'like', value: query.filter },
                    { field: 'patientName', operator: 'like', value: query.filter },
                    { field: 'patientLastname', operator: 'like', value: query.filter },
                    { field: 'patientDni', operator: 'like', value: query.filter },
                ]
            }]
        });
    });

    it("should handle case with no filter", async () => {
        const query: OrderPatientFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { patientDni: "asc" }
        };

        const mockData: OrderPatientModel[] = [
            { id: "1", patientDni: "patient-123", patientName: "John", patientLastname: "Doe", locationCompanyRuc: "RUC-123", locationCompanyName: "Company A" }
        ] as unknown as OrderPatientModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [],
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });
});