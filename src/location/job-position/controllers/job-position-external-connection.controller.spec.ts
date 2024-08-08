import { TestBed } from "@automock/jest";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { JobPositionExternalConnectionController } from "./job-position-external-connection.controller";
import { PostJobPositionRequestDto } from "../dtos/request/post.job-position.request.dto";
import { mockJobPosition } from "../services/test/stub/job-position.stub";
import { PatchJobPositionRequestDto } from "../dtos/request/patch.job-position.request.dto";

describe('JobPositionExternalConnectionController', () => {
    let controller: JobPositionExternalConnectionController;
    let service: jest.Mocked<JobPositionExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(JobPositionExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'test-source';
        const key = 'test-key';
        const body: PostJobPositionRequestDto = {
            name: 'Job Position Name'
        };
        const mockedJobPosition = mockJobPosition();

        it('should create a job position', async () => {
            // Arrange
            service.create.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await controller.create(source, key, body);

            // Assert
            expect(result).toEqual(mockedJobPosition);
            expect(service.create).toHaveBeenCalledWith({ source, key }, body);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const body: PatchJobPositionRequestDto = {
            name: 'Updated Job Position Name'
        };
        const mockedJobPosition = mockJobPosition();

        it('should update a job position', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await controller.findOneAndUpdate(source, key, body);

            // Assert
            expect(result).toEqual(mockedJobPosition);
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, body);
        });
    });
});