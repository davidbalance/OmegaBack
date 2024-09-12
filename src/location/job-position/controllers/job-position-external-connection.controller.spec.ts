import { TestBed } from "@automock/jest";
import { JobPositionExternalConnectionController } from "./job-position-external-connection.controller";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { PostExternalJobPositionRequestDto } from "../dtos/request/external-job-position.post.dto";
import { PatchExternalJobPositionRequestDto } from "../dtos/request/external-job-position.patch.dto";
import { mockExternalJobPosition } from "../stub/external-job-position.stub";

describe('JobPositionExternalConnectionController', () => {
    let controller: JobPositionExternalConnectionController;
    let service: jest.Mocked<JobPositionExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(JobPositionExternalConnectionService);
    });

    describe('create', () => {
        const source = 'test-source';
        const key = 'test-key';
        const body: PostExternalJobPositionRequestDto = {
            name: 'Job Position Name'
        };
        const mockedJobPosition = mockExternalJobPosition();
        const expectedValue = mockedJobPosition;

        it('should create a job position', async () => {
            // Arrange
            service.create.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await controller.create(source, key, body);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, body);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const body: PatchExternalJobPositionRequestDto = {
            name: 'Updated Job Position Name'
        };
        const mockedJobPosition = mockExternalJobPosition();
        const expectedValue = mockedJobPosition;

        it('should update a job position', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValueOnce(mockedJobPosition);

            // Act
            const result = await controller.findOneAndUpdate(source, key, body);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, body);
            expect(result).toEqual(expectedValue);
        });
    });
});