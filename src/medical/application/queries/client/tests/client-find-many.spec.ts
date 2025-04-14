/* eslint-disable @typescript-eslint/unbound-method */
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientFindManyQuery, ClientFindManyQueryPayload } from "../client-find-many.query";
import { ClientModel } from "@omega/medical/core/model/client/client.model";

describe("ClientFindManyQuery", () => {
    let repository: jest.Mocked<ClientRepository>;
    let handler: ClientFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        handler = new ClientFindManyQuery(repository);
    });

    it("should fetch client data with filter, companyRuc, and pagination", async () => {
        const query: ClientFindManyQueryPayload = {
            companyRuc: "12345678901",
            filter: "John",
            skip: 0,
            limit: 10,
            order: { patientName: "asc" }
        };

        const mockData: ClientModel[] = [
            { id: "1", companyRuc: "12345678901", patientDni: "patient-123", patientName: "John", patientLastname: "Doe", patientRole: "Admin" },
            { id: "2", companyRuc: "12345678901", patientDni: "patient-124", patientName: "John", patientLastname: "Smith", patientRole: "User" }
        ] as unknown as ClientModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                {
                    operator: "or", filter: [
                        { field: 'patientDni', operator: 'like', value: query.filter },
                        { field: 'patientName', operator: 'like', value: query.filter },
                        { field: 'patientLastname', operator: 'like', value: query.filter },
                        { field: 'patientRole', operator: 'like', value: query.filter },
                    ]
                },
                { field: 'companyRuc', operator: 'eq', value: query.companyRuc }
            ]
        });
        expect(result).toEqual({ data: mockData, amount: mockData.length });
        expect(repository.countAsync).toHaveBeenCalledWith([
            {
                operator: "or", filter: [
                    { field: 'patientDni', operator: 'like', value: query.filter },
                    { field: 'patientName', operator: 'like', value: query.filter },
                    { field: 'patientLastname', operator: 'like', value: query.filter },
                    { field: 'patientRole', operator: 'like', value: query.filter },
                ]
            },
            { field: 'companyRuc', operator: 'eq', value: query.companyRuc }
        ]);
    });

    it("should return empty array if no matching data found", async () => {
        const query: ClientFindManyQueryPayload = {
            companyRuc: "12345678901",
            filter: "Unknown",
            skip: 0,
            limit: 10,
            order: { patientName: "asc" }
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await handler.handleAsync(query);

        expect(result).toEqual({ data: [], amount: 0 });
        expect(repository.countAsync).toHaveBeenCalled();
    });

    it("should handle case without filter", async () => {
        const query: ClientFindManyQueryPayload = {
            companyRuc: "12345678901",
            skip: 0,
            limit: 10,
            order: { patientName: "asc" }
        };

        const mockData: ClientModel[] = [
            { id: "1", companyRuc: "12345678901", patientDni: "patient-123", patientName: "Alice", patientLastname: "Doe", patientRole: "Admin" }
        ] as unknown as ClientModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { operator: "or", filter: [] },
                { field: 'companyRuc', operator: 'eq', value: query.companyRuc }
            ]
        });
        expect(repository.countAsync).toHaveBeenCalledWith([
            { operator: "or", filter: [] },
            { field: 'companyRuc', operator: 'eq', value: query.companyRuc }
        ]);
        expect(result).toEqual({ data: mockData, amount: mockData.length });
    });
});
