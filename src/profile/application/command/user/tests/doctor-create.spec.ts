/* eslint-disable @typescript-eslint/unbound-method */
import { User } from "@omega/profile/core/domain/user/user.domain";
import { DoctorCreateCommand, DoctorCreateCommandImpl, DoctorCreateCommandPayload } from "../doctor-create.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { UserConflictError } from "@omega/profile/core/domain/user/errors/user.errors";

describe("DoctorCreateCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: DoctorCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new DoctorCreateCommandImpl(repository);
    });

    it("should create a new doctor when DNI is not already taken", async () => {
        const payload: DoctorCreateCommandPayload = {
            dni: "12345678",
            name: "John",
            lastname: "Doe",
            email: "stub@email.com"
        };
        const mockUser = { addDoctor: jest.fn() } as unknown as User;

        repository.findOneAsync.mockResolvedValue(null);

        const createUserMock = jest.spyOn(User, 'create').mockReturnValue(mockUser);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'dni', operator: 'eq', value: payload.dni }],
        });
        expect(createUserMock).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw an error when DNI is already taken", async () => {
        const payload: DoctorCreateCommandPayload = {
            dni: "1234567890",
            name: "John",
            lastname: "Doe",
            email: "stub@email.com"
        };
        repository.findOneAsync.mockResolvedValue({} as User);

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserConflictError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'dni', operator: 'eq', value: payload.dni }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
