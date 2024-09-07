import { TestBed } from "@automock/jest";
import { JobPositionExternalConnectionService } from "../services/job-position-external-connection.service";
import { JobPositionExternalListener } from "./job-position-external.listener";
import { mockJobPosition } from "../stub/job-position.stub";

describe('JobPositionExternalListener', () => {
    let listener: JobPositionExternalListener;
    let service: jest.Mocked<JobPositionExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalListener).compile();

        listener = unit;
        service = unitRef.get(JobPositionExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onExternalCreate', () => {
        const key = 'test-key';
        const source = 'test-source';
        const data = {
            name: 'Job Position Name',
            description: 'Job Position Description'
        };
        const mockedJobPosition = mockJobPosition();

        it('should call findOneOrCreate on service', async () => {
            // Arrange
            service.findOneOrCreate.mockResolvedValueOnce(mockedJobPosition);

            // Act
            await listener.onExternalCreate({ key, source, data });

            // Assert
            expect(service.findOneOrCreate).toHaveBeenCalledWith({ key, source }, data);
        });
    });
});