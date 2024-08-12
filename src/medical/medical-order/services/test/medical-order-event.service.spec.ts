import { EventEmitter2 } from "@nestjs/event-emitter";
import { MedicalOrderEventService } from "../medical-order-event.service";
import { TestBed } from "@automock/jest";
import { PostBranchWithKeyRequestDto } from "@/location/branch/dtos/request/post.branch-with-key.request.dto";
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
        const source = 'test-source';
        const branch: PostBranchWithKeyRequestDto = {
            key: "test-key",
            company: {
                address: "Test address",
                key: "test-key",
                corporativeGroup: {
                    key: "test-key",
                    name: "Corporative group"
                },
                ruc: "1234567890001",
                name: "Company",
                phone: "0999999999"
            },
            name: "Branch",
            city: "Quito"
        };

        it('should emit a BranchExternalCreateEvent', () => {
            // Arrange
            const { key: branchKey, ...brachExpectedData } = branch;
            const expectedEvent = new BranchExternalCreateEvent(source, branchKey, brachExpectedData);

            // Act
            service.emitMedicalOrderCreateEvent(source, branch);

            // Assert
            expect(eventEmitter.emit).toHaveBeenCalledWith(BranchEvent.EXTERNAL_CREATE, expectedEvent);
        });
    });
});