import { TestBed } from "@automock/jest";
import { JobPositionManagementService } from "../services/job-position-management.service";
import { JobPositionListener } from "./job-position.listener";
import { mockJobPositionEntity } from "../stub/job-position-entity.stub";

describe('JobPositionListener', () => {
    let listener: JobPositionListener;
    let service: jest.Mocked<JobPositionManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionListener).compile();

        listener = unit;
        service = unitRef.get(JobPositionManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onCreateEvent', () => {
        const data = {
            name: 'Job Position Name',
            description: 'Job Position Description'
        };
        const mockedJobPosition = mockJobPositionEntity();

        it('should call findOneByName on service', async () => {
            // Arrange
            service.findOneByName.mockResolvedValueOnce(mockedJobPosition);

            // Act
            await listener.onCreateEvent({ data });

            // Assert
            expect(service.findOneByName).toHaveBeenCalledWith(data.name);
            expect(service.create).not.toHaveBeenCalled();
        });

        it('should call findOneByName on service and throw error', async () => {
            // Arrange
            service.findOneByName.mockRejectedValue(new Error());

            // Act
            await listener.onCreateEvent({ data });

            // Assert
            expect(service.findOneByName).toHaveBeenCalledWith(data.name);
            expect(service.create).toHaveBeenCalledWith(data);
        });
    });
});