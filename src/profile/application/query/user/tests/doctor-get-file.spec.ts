/* eslint-disable @typescript-eslint/unbound-method */
import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { FileOperation } from "@shared/shared/providers";
import { DoctorGetFileQuery } from "../doctor-get-file.query";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";

describe("DoctorGetFileQuery", () => {
    let repository: jest.Mocked<DoctorRepository>;
    let file: jest.Mocked<FileOperation>;
    let handler: DoctorGetFileQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<DoctorRepository>;

        file = {
            read: jest.fn(),
        } as unknown as jest.Mocked<FileOperation>;

        handler = new DoctorGetFileQuery(repository, file);
    });

    it("should return the file buffer when doctor is found", async () => {
        const mockDoctor = {
            userId: "doctor1",
            doctorSignature: "signature/path",
        } as DoctorModel;

        const mockBuffer = Buffer.from("mock file data");

        repository.findOneAsync.mockResolvedValue(mockDoctor);
        file.read.mockResolvedValue(mockBuffer);

        const result = await handler.handleAsync({ userId: "doctor1" });

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: 'userId', operator: 'eq', value: "doctor1" }]);
        expect(file.read).toHaveBeenCalledWith(mockDoctor.doctorSignature);
        expect(result).toEqual(mockBuffer);
    });

    it("should throw an error if doctor is not found", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync({ userId: "doctor1" })).rejects.toThrow(DoctorNotFoundError);
    });
});
