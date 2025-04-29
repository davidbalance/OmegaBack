/* eslint-disable @typescript-eslint/unbound-method */
import { User } from "@omega/profile/core/domain/user/user.domain";
import { PatientCreateCommand, PatientCreateCommandImpl, PatientCreateCommandPayload } from "../patient-create.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

describe("PatientCreateCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let handler: PatientCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        handler = new PatientCreateCommandImpl(repository);
    });

    it("should create a patient when no existing user with the same DNI", async () => {
        const mockUser: User = { addPatient: jest.fn() } as unknown as User;

        jest.spyOn(User, "create").mockReturnValue(mockUser);

        const payload: PatientCreateCommandPayload = {
            dni: "1234567890",
            name: "John",
            lastname: "Doe",
            birthday: new Date("2000-01-01"),
            email: "stub@email.com",
            gender: "female"
        };

        repository.findOneAsync.mockResolvedValue(null);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'dni', operator: 'eq', value: payload.dni }],
        });

        expect(mockUser.addPatient).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should add patient to user if user already exists", async () => {
        const mockUser: User = { addPatient: jest.fn() } as unknown as User;

        const payload: PatientCreateCommandPayload = {
            dni: "1234567890",
            name: "John",
            lastname: "Doe",
            birthday: new Date("2000-01-01"),
            email: "stub@email.com",
            gender: "female"
        };
        repository.findOneAsync.mockResolvedValue(mockUser);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'dni', operator: 'eq', value: payload.dni }],
        });

        expect(mockUser.addPatient).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });
});
