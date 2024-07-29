import { TestBed } from '@automock/jest';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEventService } from '../user-event.service';
import { UserEvent, UserUpdateEvent, UserRemoveEvent } from '@/shared/events';

describe('User Event Service', () => {
    let service: UserEventService;
    let eventEmitter: jest.Mocked<EventEmitter2>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserEventService).compile();

        service = unit;
        eventEmitter = unitRef.get(EventEmitter2);

        jest.clearAllMocks();
    });

    describe('emitUserUpdateEvent', () => {
        const id = 1;
        const email = 'test@example.com';

        it('should emit UserUpdateEvent with id and email', () => {

            service.emitUserUpdateEvent(id, email);

            expect(eventEmitter.emit).toHaveBeenCalledWith(UserEvent.UPDATE, expect.any(UserUpdateEvent));
            expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        });
    });

    describe('emitUserDeleteEvent', () => {
        const id = 1;

        it('should emit UserUpdateEvent with id and email', () => {

            service.emitUserDeleteEvent(id);

            expect(eventEmitter.emit).toHaveBeenCalledWith(UserEvent.REMOVE, expect.any(UserRemoveEvent));
            expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        });
    });
});
