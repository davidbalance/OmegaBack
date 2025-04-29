/* eslint-disable @typescript-eslint/unbound-method */
import { ClientDoctorRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientDoctorFindManyQuery, ClientDoctorFindManyQueryImpl, ClientDoctorFindManyQueryPayload } from "../client-doctor-find-many.query";
import { ClientDoctorModel } from "@omega/medical/core/model/client/client-doctor.model";

describe("ClientDoctorFindManyQuery", () => {
    let repository: jest.Mocked<ClientDoctorRepository>;
    let queryHandler: ClientDoctorFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientDoctorRepository>;

        queryHandler = new ClientDoctorFindManyQueryImpl(repository);
    });

    it("should fetch client doctor data with filter and pagination", async () => {
        const queryPayload: ClientDoctorFindManyQueryPayload = {
            doctorDni: "doctor-123",
            filter: "John",
            skip: 0,
            limit: 10,
            order: { patientName: 'asc' }
        };

        const mockData: ClientDoctorModel[] = [
            { id: "1", doctorDni: "doctor-123", patientDni: "patient-123", patientName: "John", patientLastname: "Doe" },
            { id: "2", doctorDni: "doctor-123", patientDni: "patient-124", patientName: "John", patientLastname: "Smith" }
        ] as unknown as ClientDoctorModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [
                {
                    operator: 'or', filter: [
                        { field: 'patientDni', operator: 'like', value: queryPayload.filter },
                        { field: 'patientName', operator: 'like', value: queryPayload.filter },
                        { field: 'patientLastname', operator: 'like', value: queryPayload.filter },
                    ]
                },
                { field: 'doctorDni', operator: 'eq', value: queryPayload.doctorDni }
            ],
        });
        expect(result).toEqual({ data: mockData, amount: mockData.length });
        expect(repository.countAsync).toHaveBeenCalledWith([
            {
                operator: 'or', filter: [
                    { field: 'patientDni', operator: 'like', value: queryPayload.filter },
                    { field: 'patientName', operator: 'like', value: queryPayload.filter },
                    { field: 'patientLastname', operator: 'like', value: queryPayload.filter },
                ]
            },
            { field: 'doctorDni', operator: 'eq', value: queryPayload.doctorDni }
        ]);
    });

    it("should return empty array if no matching data found", async () => {
        const queryPayload: ClientDoctorFindManyQueryPayload = {
            doctorDni: "doctor-123",
            filter: "Unknown",
            skip: 0,
            limit: 10,
            order: { patientName: 'asc' }
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(result).toEqual({ data: [], amount: 0 });
        expect(repository.countAsync).toHaveBeenCalled();
    });

    it("should handle case without filter", async () => {
        const queryPayload: ClientDoctorFindManyQueryPayload = {
            doctorDni: "doctor-123",
            filter: undefined,
            skip: 0,
            limit: 10,
            order: { patientName: 'asc' }
        };

        const mockData: ClientDoctorModel[] = [
            { id: "1", doctorDni: "doctor-123", patientDni: "patient-123", patientName: "Alice", patientLastname: "Doe" }
        ] as unknown as ClientDoctorModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [
                { operator: 'or', filter: [] },
                { field: 'doctorDni', operator: 'eq', value: queryPayload.doctorDni }
            ],
        });
        expect(result).toEqual({ data: mockData, amount: mockData.length });
        expect(repository.countAsync).toHaveBeenCalledWith([
            { operator: 'or', filter: [] },
            { field: 'doctorDni', operator: 'eq', value: queryPayload.doctorDni }
        ]);
    });
});