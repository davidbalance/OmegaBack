import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../repositories/job-position.repository";
import { JobPositionExternalConnectionService } from "./job-position-external-connection.service";
import { JobPositionExternalKeyService } from "./job-position-external-key.service";
import { PostExternalJobPositionRequestDto } from "../dtos/request/external-job-position.post.dto";
import { ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { mockJobPosition } from "../stub/job-position.stub";
import { mockJobPositionExternalKey } from "../stub/job-position-external-key.stub";
import { PatchExternalJobPositionRequestDto } from "../dtos/request/external-job-position.patch.dto";

describe('JobPositionExternalConnectionService', () => {
    let service: JobPositionExternalConnectionService;
    let repository: jest.Mocked<JobPositionRepository>;
    let keyService: jest.Mocked<JobPositionExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(JobPositionRepository);
        keyService = unitRef.get(JobPositionExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should throw error on findOne', async () => {
        expect(service.findOne).toBeDefined();
    });

    describe('create', () => {
        const key = 'test-key';
        const source = 'test-source'
        const data: PostExternalJobPositionRequestDto = { name: 'Test Job Position' };
        const keyParam: ExternalKeyParam = { key, source }
        const mockedKey = mockJobPositionExternalKey();
        const mockedJobPosition = mockJobPosition();
        const expectedValue = mockedJobPosition;

        it('should create a new job position', async () => {
            // Arrange
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedJobPosition);

            // Act
            const result = await service.create(keyParam, data);

            // Assert
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({ ...data, externalKey: mockedKey });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if position creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');

            // Act
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);

            // Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({ ...data, externalKey: mockedKey });
            expect(keyService.remove).toHaveBeenCalledWith(keyParam);
        });
    })

    describe('findOneOrCreate', () => {
        const key = 'test-key';
        const source = 'test-source';
        const keyParam: ExternalKeyParam = { key, source };
        const data: PostExternalJobPositionRequestDto = { name: 'Test Job Position' };
        const mockedJobPosition = mockJobPosition();
        const expectedJobPosition = mockedJobPosition;

        it('should find a job position by external key or name', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedJobPosition);

            // Act
            const result = await service.findOneOrCreate(keyParam, data);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ externalKey: keyParam }, { name: data.name }]
            });
            expect(result).toEqual(expectedJobPosition);
        });

        it('should create a new job position if not found', async () => {
            // Arrange
            const mockedKey = mockJobPositionExternalKey();

            repository.findOne.mockRejectedValue(new Error('Not found'));
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedJobPosition);

            // Act
            const result = await service.findOneOrCreate(keyParam, data);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: keyParam },
                    { name: data.name }
                ]
            });
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({ ...data, externalKey: mockedKey });
            expect(result).toEqual(expectedJobPosition);
        });
    });

    describe('findOneAndUpdate', () => {
        const key = 'test-key';
        const source = 'test-source';
        const keyParam: ExternalKeyParam = { key, source };
        const data: PatchExternalJobPositionRequestDto = { name: 'Updated Job Position' };
        const mockedJobPosition = mockJobPosition();
        const expectedValue = mockedJobPosition;

        it('should update a job position', async () => {
            // Assert
            repository.findOneAndUpdate.mockResolvedValue(mockedJobPosition);

            // Act
            const result = await service.findOneAndUpdate(keyParam, data);

            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});