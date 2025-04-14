/* eslint-disable @typescript-eslint/unbound-method */
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientFindManyByCompanyRucQuery, ClientFindManyByCompanyRucQueryPayload } from "../client-find-many-by-company-ruc.query";
import { ClientModel } from "@omega/medical/core/model/client/client.model";

describe("ClientFindManyByCompanyRucQuery", () => {
    let repository: jest.Mocked<ClientRepository>;
    let queryHandler: ClientFindManyByCompanyRucQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        queryHandler = new ClientFindManyByCompanyRucQuery(repository);
    });

    it("should fetch client data based on filter and companyRuc", async () => {
        const queryPayload: ClientFindManyByCompanyRucQueryPayload = {
            filter: "John",
            companyRuc: "12345678901",
            skip: 0,
            limit: 10,
            order: { patientName: "asc" }
        };

        const mockData: ClientModel[] = [
            { id: "1", companyRuc: "12345678901", patientDni: "patient-123", patientName: "John", patientLastname: "Doe", patientRole: "Admin" },
            { id: "2", companyRuc: "12345678901", patientDni: "patient-124", patientName: "John", patientLastname: "Smith", patientRole: "User" }
        ] as unknown as ClientModel[];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await queryHandler.handleAsync(queryPayload);


        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [
                {
                    operator: "or", filter: [
                        { field: 'patientDni', operator: 'like', value: queryPayload.filter },
                        { field: 'patientName', operator: 'like', value: queryPayload.filter },
                        { field: 'patientLastname', operator: 'like', value: queryPayload.filter },
                        { field: 'patientRole', operator: 'like', value: queryPayload.filter },
                    ]
                },
                { field: 'companyRuc', operator: 'eq', value: queryPayload.companyRuc }
            ]
        });


        expect(result).toEqual(mockData);
    });

    it("should return empty array if no matching data found", async () => {
        const queryPayload: ClientFindManyByCompanyRucQueryPayload = {
            filter: "Unknown",
            companyRuc: "12345678901",
            skip: 0,
            limit: 10,
            order: { patientName: "asc" }
        };

        repository.findManyAsync.mockResolvedValue([]);

        const result = await queryHandler.handleAsync(queryPayload);


        expect(result).toEqual([]);


        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [
                {
                    operator: "or", filter: [
                        { field: 'patientDni', operator: 'like', value: queryPayload.filter },
                        { field: 'patientName', operator: 'like', value: queryPayload.filter },
                        { field: 'patientLastname', operator: 'like', value: queryPayload.filter },
                        { field: 'patientRole', operator: 'like', value: queryPayload.filter },
                    ]
                },
                { field: 'companyRuc', operator: 'eq', value: queryPayload.companyRuc }
            ]
        });
    });

    it("should handle case with no filter", async () => {
        const queryPayload: ClientFindManyByCompanyRucQueryPayload = {
            filter: "",
            companyRuc: "12345678901",
            skip: 0,
            limit: 10,
            order: { patientName: "asc" }
        };

        const mockData: ClientModel[] = [
            { id: "1", companyRuc: "12345678901", patientDni: "patient-123", patientName: "Alice", patientLastname: "Doe", patientRole: "Admin" }
        ] as unknown as ClientModel[];

        repository.findManyAsync.mockResolvedValue(mockData);

        const result = await queryHandler.handleAsync(queryPayload);


        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [
                {
                    operator: "or", filter: [
                        { field: 'patientDni', operator: 'like', value: queryPayload.filter },
                        { field: 'patientName', operator: 'like', value: queryPayload.filter },
                        { field: 'patientLastname', operator: 'like', value: queryPayload.filter },
                        { field: 'patientRole', operator: 'like', value: queryPayload.filter },
                    ]
                },
                { field: 'companyRuc', operator: 'eq', value: queryPayload.companyRuc }
            ]
        });


        expect(result).toEqual(mockData);
    });
});
