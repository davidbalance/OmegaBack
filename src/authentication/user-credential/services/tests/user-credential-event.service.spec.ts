import { TestBed } from "@automock/jest";
import { UserCredentialEventService } from "../user-credential-event.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CredentialEvent, OnCredentialCreateEvent, OnCredentialRemoveEvent } from "@/shared/events/credential.event";

describe('UserCredentialEventService', () => {
    let service: UserCredentialEventService;
    let eventEmitter: jest.Mocked<EventEmitter2>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserCredentialEventService).compile();

        service = unit;
        eventEmitter = unitRef.get(EventEmitter2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('emitCredentialCreateEvent', () => {
        const user = 1;

        it('should emit an ON_CREATE event with the correct payload', () => {
            // Act
            service.emitCredentialCreateEvent(user);

            // Assert
            expect(eventEmitter.emit).toHaveBeenCalledWith(
                CredentialEvent.ON_CREATE,
                new OnCredentialCreateEvent(user),
            );
        });
    });

    describe('emitCredentialRemoveEvent', () => {
        const user = 1;

        it('should emit an ON_REMOVE event with the correct payload', () => {
            // Act
            service.emitCredentialRemoveEvent(user);

            // Assert
            expect(eventEmitter.emit).toHaveBeenCalledWith(
                CredentialEvent.ON_REMOVE,
                new OnCredentialRemoveEvent(user),
            );
        });
    });

});