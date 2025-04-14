/* eslint-disable @typescript-eslint/unbound-method */
import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { DoctorFindOneQuery, DoctorFindOneQueryPayload } from "../doctor-find-one.query";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";

describe("DoctorFindOneQuery", () => {
    let repository: jest.Mocked<DoctorRepository>;
    let handler: DoctorFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<DoctorRepository>;

        handler = new DoctorFindOneQuery(repository);
    });

    it("should return a doctor when found by userId", async () => {
        const mockDoctor: DoctorModel = {
            userId: "user123",
            userDni: "123456789",
            userEmail: "doctor@example.com",
            userName: "Dr. John",
            userLastname: "Doe",
        } as unknown as DoctorModel;

        const query: DoctorFindOneQueryPayload = { userId: "user123" };

        repository.findOneAsync.mockResolvedValue(mockDoctor);

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "userId", operator: "eq", value: query.userId }]);
        expect(result).toEqual(mockDoctor);
    });

    it("should throw a DoctorNotFoundError when no doctor is found by userId", async () => {
        const query: DoctorFindOneQueryPayload = { userId: "user123" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(query)).rejects.toThrow(DoctorNotFoundError);
    });
});
