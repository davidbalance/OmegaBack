/* eslint-disable @typescript-eslint/unbound-method */
import { OrderDoctorRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderDoctorFindManyQuery, OrderDoctorFindManyQueryImpl, OrderDoctorFindManyQueryPayload } from "../order-doctor-find-many.query";
import { OrderDoctorModel } from "@omega/medical/core/model/order/order-doctor.model";

describe("OrderDoctorFindManyQuery", () => {
    let repository: jest.Mocked<OrderDoctorRepository>;
    let handler: OrderDoctorFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderDoctorRepository>;

        handler = new OrderDoctorFindManyQueryImpl(repository);
    });

    it("should fetch order doctor data based on filter, patientDni, and doctorDni", async () => {
        const query: OrderDoctorFindManyQueryPayload = {
            patientDni: "patient-123",
            doctorDni: "doctor-456",
            filter: "urgent",
            skip: 0,
            limit: 10,
            order: { orderProcess: "asc" }
        };

        const mockData: OrderDoctorModel[] = [
            { id: "1", patientDni: "patient-123", doctorDni: "doctor-456", orderProcess: "urgent" },
            { id: "2", patientDni: "patient-123", doctorDni: "doctor-456", orderProcess: "urgent" }
        ] as unknown as OrderDoctorModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                {
                    operator: 'or', filter: [
                        { field: 'orderProcess', operator: 'like', value: query.filter }
                    ]
                },
                { field: 'patientDni', operator: 'eq', value: query.patientDni },
                { field: 'doctorDni', operator: 'eq', value: query.doctorDni },
            ]
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });

    it("should return empty array if no matching data found", async () => {
        const query: OrderDoctorFindManyQueryPayload = {
            patientDni: "patient-123",
            doctorDni: "doctor-456",
            filter: "non-existent-filter",
            skip: 0,
            limit: 10,
            order: { orderProcess: "asc" }
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await handler.handleAsync(query);

        expect(result.data).toEqual([]);
        expect(result.amount).toBe(0);
        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                {
                    operator: 'or', filter: [
                        { field: 'orderProcess', operator: 'like', value: query.filter }
                    ]
                },
                { field: 'patientDni', operator: 'eq', value: query.patientDni },
                { field: 'doctorDni', operator: 'eq', value: query.doctorDni },
            ]
        });
    });

    it("should handle case with no filter", async () => {
        const query: OrderDoctorFindManyQueryPayload = {
            patientDni: "patient-123",
            doctorDni: "doctor-456",
            skip: 0,
            limit: 10,
            order: { orderProcess: "asc" }
        };

        const mockData: OrderDoctorModel[] = [
            { id: "1", patientDni: "patient-123", doctorDni: "doctor-456", orderProcess: "routine" }
        ] as unknown as OrderDoctorModel[];

        repository.findManyAsync.mockResolvedValue(mockData);
        repository.countAsync.mockResolvedValue(mockData.length);

        const result = await handler.handleAsync(query);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...query,
            filter: [
                { operator: 'or', filter: [] },
                { field: 'patientDni', operator: 'eq', value: query.patientDni },
                { field: 'doctorDni', operator: 'eq', value: query.doctorDni },
            ]
        });
        expect(result.data).toEqual(mockData);
        expect(result.amount).toBe(mockData.length);
    });
});
