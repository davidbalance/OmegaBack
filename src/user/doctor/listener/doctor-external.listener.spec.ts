import { TestBed } from "@automock/jest";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { DoctorExternalListener } from "./doctor-external.listener";
import { DoctorExternalCreateEvent } from "@/shared/events/doctor.event";

describe('DoctorExternalListener', () => {
    let listener: DoctorExternalListener;
    let service: jest.Mocked<DoctorExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorExternalListener).compile();

        listener = unit;
        service = unitRef.get(DoctorExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findOrCreate', () => {
        const mockedData: DoctorExternalCreateEvent = {
            data: {
                dni: '1234567890',
                email: 'test@email.com',
                lastname: 'Lastname',
                name: 'Name'
            }
        };

        it('should find or create a doctor when an external create event is emitted', async () => {
            // Arrange
            service.findOneOrCreate.mockResolvedValue(undefined);

            // Act
            await listener.findOrCreate(mockedData);

            // Assert
            expect(service.findOneOrCreate).toHaveBeenCalledWith(mockedData.data);
        });
    });

});