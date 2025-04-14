/* eslint-disable @typescript-eslint/unbound-method */
import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { DoctorFindOneByDniQuery, DoctorFindOneByDniQueryPayload } from "../doctor-find-one-by-dni.query";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";

describe("DoctorFindOneByDniQuery", () => {
    let repository: jest.Mocked<DoctorRepository>;
    let handler: DoctorFindOneByDniQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<DoctorRepository>;

        handler = new DoctorFindOneByDniQuery(repository);
    });

    it("should return a doctor when found by DNI", async () => {
        const mockDoctor: DoctorModel = {
            userDni: "123456789",
            userEmail: "doctor@example.com",
            userName: "Dr. John",
            userLastname: "Doe",
        } as unknown as DoctorModel;

        const query: DoctorFindOneByDniQueryPayload = { userDni: "123456789" };

        repository.findOneAsync.mockResolvedValue(mockDoctor); // Simulate repository return

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "userDni", operator: "eq", value: query.userDni }]);
        expect(result).toEqual(mockDoctor);
    });

    it("should throw a DoctorNotFoundError when no doctor is found by DNI", async () => {
        const query: DoctorFindOneByDniQueryPayload = { userDni: "123456789" };

        repository.findOneAsync.mockResolvedValue(null); // Simulate no result

        await expect(handler.handleAsync(query)).rejects.toThrow(DoctorNotFoundError);
    });
});
