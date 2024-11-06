import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorFileManagementService } from "./doctor-file-management.service";
import { TestBed } from "@automock/jest";
import { mockDoctorEntity } from "../stub/doctor-entity.stub";
import { signaturePath } from "@/shared/utils";
import { Path } from "@/shared/nest-ext/path/path.type";
import { NEST_PATH } from "@/shared/nest-ext/path/inject-token";
import { IFileSystem } from "@/shared/file-system/file-system.interface";
import { FILE_SYSTEM } from "@/shared/file-system/inject-token";

describe('DoctorFileManagementService', () => {
    let service: DoctorFileManagementService;
    let repository: jest.Mocked<DoctorRepository>;
    let fileSystem: jest.Mocked<IFileSystem>;
    let path: jest.Mocked<Path>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorFileManagementService).compile();

        service = unit;
        repository = unitRef.get(DoctorRepository);
        fileSystem = unitRef.get(FILE_SYSTEM);
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
        const mockedBuffer = {} as Buffer;
        const expectedData = mockedBuffer;

        it('should find a file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedDoctor);
            path.join.mockReturnValue(directoryImage);
            fileSystem.read.mockResolvedValue(mockedBuffer);

            // Act
            const result = await service.findFile(id);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
            expect(path.join).toHaveBeenCalledWith(filepath, `${mockedDoctor.user.dni}.png`);
            expect(fileSystem.read).toHaveBeenCalledWith(directoryImage);
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
        const extension = '.png';
        const filename = '/path/to/file.png';

        it('should upload a file', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedDoctor);
            path.extname.mockReturnValue(extension);
            fileSystem.write.mockResolvedValue(undefined);
            repository.findOneAndUpdate.mockResolvedValue(undefined);
            path.resolve.mockReturnValue(filename);

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
            expect(fileSystem.write).toHaveBeenCalledWith(filename, signature.buffer, { extension: extension, filename: mockedDoctor.user.dni });
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { hasFile: true });
        });
    });
});