import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorFileManagementService } from "./doctor-file-management.service";
import { TestBed } from "@automock/jest";
import { mockDoctorEntity } from "../stub/doctor-entity.stub";
import { signaturePath } from "@/shared/utils";
import { ReadStream } from "fs";
import { NestPath } from "@/shared/nest-ext/nest-path/nest-path.type";
import { NEST_PATH } from "@/shared/nest-ext/nest-path/inject-token";

describe('DoctorFileManagementService', () => {
    let service: DoctorFileManagementService;
    let repository: jest.Mocked<DoctorRepository>;
    let storage: jest.Mocked<StorageManager>;
    let path: jest.Mocked<NestPath>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorFileManagementService).compile();

        service = unit;
        repository = unitRef.get(DoctorRepository);
        storage = unitRef.get(INJECT_STORAGE_MANAGER);
        path = unitRef.get(NEST_PATH);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findFile', () => {
        const id = 1;
        const mockedDoctor = mockDoctorEntity();
        const filepath: string = signaturePath({ dni: mockedDoctor.user.dni });
        const directoryImage: string = '/path/to/file.png'
        const mockedReadStream = {} as ReadStream;
        const expectedData = mockedReadStream;

        it('should find a file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedDoctor);
            path.join.mockReturnValue(directoryImage);
            storage.readFile.mockResolvedValue(mockedReadStream);

            // Act
            const result = await service.findFile(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
            expect(path.join).toHaveBeenCalledWith(filepath, `${mockedDoctor.user.dni}.png`);
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
        const extension = '.png';

        it('should upload a file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedDoctor);
            path.extname.mockReturnValue(extension);
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
            expect(path.extname).toHaveBeenCalledWith(signature.originalname);
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