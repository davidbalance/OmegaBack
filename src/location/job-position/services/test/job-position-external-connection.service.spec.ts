import { TestBed } from "@automock/jest";
import { JobPositionRepository } from "../../repositories/job-position.repository";
import { JobPositionExternalConnectionService } from "../job-position-external-connection.service";
import { JobPositionExternalKeyService } from "../job-position-external-key.service";
import { mockJobPositionExternalKey } from "./stub/job-position-external-key.stub";
import { mockJobPosition } from "./stub/job-position.stub";
import { PostJobPositionRequestDto } from "../../dtos/request/post.job-position.request.dto";
import { PatchJobPositionRequestDto } from "../../dtos/request/patch.job-position.request.dto";

describe('JobPositionExternalConnectionService', () => {
    let service: JobPositionExternalConnectionService;
    let repository: jest.Mocked<JobPositionRepository>;
    let externalKeyService: jest.Mocked<JobPositionExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(JobPositionRepository);
        externalKeyService = unitRef.get(JobPositionExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const key: string = 'test-key';
        const source: string = 'test-source';
        const mockedKey = mockJobPositionExternalKey();
        const mockedJobPosition = mockJobPosition();
        const body: PostJobPositionRequestDto = {
            name: "Job Position Name"
        }

        it('should create a job position', async () => {
            // Arrange
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await service.create({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedJobPosition);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...body,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).not.toHaveBeenCalled();
        });

        it('should throw an error if job position creation fails', async () => {
            // Arrange
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            // Act
            await expect(service.create({ key, source }, body))
                .rejects
                .toThrowError(Error);

            // Assert
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...body,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ key, source });
        });
    });

    describe('findOneOrCreate', () => {
        const key: string = 'test-key';
        const source: string = 'test-source';
        const mockedKey = mockJobPositionExternalKey();
        const mockedJobPosition = mockJobPosition();
        const body: PostJobPositionRequestDto = {
            name: "Job Position Name"
        }

        it('should return an existing job position', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await service.findOneOrCreate({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedJobPosition);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    { name: body.name }
                ]
            });
            expect(externalKeyService.create).not.toHaveBeenCalled();
            expect(repository.create).not.toHaveBeenCalled();
        });

        it('should create a new job position if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValueOnce(new Error('Job position not found'));
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await service.findOneOrCreate({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedJobPosition);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    { name: body.name }
                ]
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...body,
                externalKey: mockedKey
            });
        });
    });

    describe('findOneAndUpdate', () => {
        const key: string = 'test-key';
        const source: string = 'test-source';
        const mockedJobPosition = mockJobPosition();
        const body: PatchJobPositionRequestDto = {
            name: "Updated Job Position Name"
        }

        it('should update an existing job position', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await service.findOneAndUpdate({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedJobPosition);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: { key, source } }, body);
        });
    });

});
