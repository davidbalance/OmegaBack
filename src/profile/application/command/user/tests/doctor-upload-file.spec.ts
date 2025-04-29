/* eslint-disable @typescript-eslint/unbound-method */
import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { FileOperation } from "@shared/shared/providers";
import { DoctorUploadFileCommand, DoctorUploadFileCommandImpl, DoctorUploadFileCommandPayload } from "../doctor-upload-file.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

describe("DoctorUploadFileCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let file: jest.Mocked<FileOperation>;
    let handler: DoctorUploadFileCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        file = {
            write: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        handler = new DoctorUploadFileCommandImpl(repository, file);
    });

    it("should upload the file when user is found and is a doctor", async () => {
        const mockUser: User = {
            id: "user-123",
            dni: "doctor-dni",
            doctor: { signature: "doctor-signature.png" },
            addFileToDoctor: jest.fn(),
        } as unknown as User;

        const payload: DoctorUploadFileCommandPayload = {
            userId: "user-123",
            buffer: Buffer.from("file-content"),
        };

        repository.findOneAsync.mockResolvedValue(mockUser);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(file.write).toHaveBeenCalledWith(`signatures/${mockUser.dni}`, `${mockUser.dni}.png`, payload.buffer);
        expect(mockUser.addFileToDoctor).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should throw UserNotFoundError when the user does not exist", async () => {
        const payload: DoctorUploadFileCommandPayload = {
            userId: "user-123",
            buffer: Buffer.from("file-content"),
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(new UserNotFoundError(payload.userId));

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw DoctorNotFoundError when the user is not a doctor", async () => {
        const mockUser = { id: "user-123" } as unknown as User;
        const payload: DoctorUploadFileCommandPayload = {
            userId: "user-123",
            buffer: Buffer.from("file-content"),
        };

        repository.findOneAsync.mockResolvedValue(mockUser);

        await expect(handler.handleAsync(payload)).rejects.toThrow(new DoctorNotFoundError(payload.userId));

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
