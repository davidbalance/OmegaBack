import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorFileManagementService } from "./doctor-file-management.service";
import { TestBed } from "@automock/jest";
import { mockDoctorEntity } from "../stub/doctor-entity.stub";
import { signaturePath } from "@/shared/utils";
import path from "path";
import { ReadStream } from "fs";

describe('DoctorFileManagementService', () => {
    let service: DoctorFileManagementService;
    let repository: jest.Mocked<DoctorRepository>;
    let storage: jest.Mocked<StorageManager>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorFileManagementService).compile();

        service = unit;
        repository = unitRef.get(DoctorRepository);
        storage = unitRef.get(INJECT_STORAGE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findFile', () => {
        const id = 1;
        const mockedDoctor = mockDoctorEntity();
        const filepath: string = signaturePath({ dni: mockedDoctor.user.dni });
        const directoryImage: string = path.join(filepath, `${mockedDoctor.user.dni}.png`);
        const mockedReadStream = {} as ReadStream;
        const expectedData = mockedReadStream;

        it('should find a file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedDoctor);
            storage.readFile.mockResolvedValue(mockedReadStream);

            // Act
            const result = await service.findFile(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
            expect(storage.readFile).toHaveBeenCalledWith(directoryImage);
            expect(result).toEqual(expectedData);
        });
    });

    describe('uploadFile', () => {
        const id = 1;
        const mockedDoctor = mockDoctorEntity();
        const signature = {
            originalname: 'test.png',
            buffer: Buffer.from('test'),
        } as Express.Multer.File;
        const directory = mockedDoctor.user.dni;
        const extension = path.extname(signature.originalname);

        it('should upload a file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedDoctor);
            storage.saveFile.mockResolvedValue(undefined);
            repository.findOneAndUpdate.mockResolvedValue(undefined);

            // Act
            await service.uploadFile(id, signature);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id },
                select: {
                    user: { dni: true },
                },
            });
            expect(storage.saveFile).toHaveBeenCalledWith(
                signature.buffer,
                extension,
                path.resolve(signaturePath({ dni: directory })),
                mockedDoctor.user.dni,
            );
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { hasFile: true });
        });
    });
});