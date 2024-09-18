import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalOrderEventService } from "./medical-order-event.service";
import { TestBed } from "@automock/jest";
import { ExternalBranchWithKeyRequestDto } from "@/location/branch/dtos/request/external-branch-with-key.post.dto";
import { BranchEvent, BranchExternalCreateEvent } from "@/shared/events/branch.event";

describe('MedicalOrderEventService', () => {
    let service: MedicalOrderEventService;
    let eventEmitter: jest.Mocked<EventEmitter2>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderEventService).compile();

        service = unit;
        eventEmitter = unitRef.get(EventEmitter2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('emitMedicalOrderCreateEvent', () => {
        it('should emit an EXTERNAL_CREATE event with the correct payload', () => {
            // Arrange
            const source = 'test-source';
            const branchDto: ExternalBranchWithKeyRequestDto = {
                key: "test-key",
                company: {
                    key: "test-key",
                    corporativeGroup: {
                        key: "test-key",
                        name: "Test name"
                    },
                    name: "Test name",
                    ruc: "1234567890001",
                    address: "Test address",
                    phone: "0999999999"
                },
                name: "Test name",
                city: "Quito"
            };

            // Act
            service.emitMedicalOrderCreateEvent(source, branchDto);

            // Assert
            const { key, ...expectedDto } = branchDto;
            expect(eventEmitter.emit).toHaveBeenCalledWith(
                BranchEvent.EXTERNAL_CREATE,
                new BranchExternalCreateEvent(source, key, expectedDto),
            );
        });
    });
});