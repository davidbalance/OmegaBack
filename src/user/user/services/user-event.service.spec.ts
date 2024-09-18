import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserEventService } from "./user-event.service";
import { TestBed } from "@automock/jest";
import { OnUserRemoveEvent, OnUserUpdateEvent, UserEvent } from "@/shared/events/user.event";

describe('UserEventService', () => {
    let service: UserEventService;
    let eventEmitter: jest.Mocked<EventEmitter2>;
  
    beforeEach(async () => {
      const { unit, unitRef } = TestBed.create(UserEventService).compile();
  
      service = unit;
      eventEmitter = unitRef.get(EventEmitter2);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('emitUserUpdateEvent', () => {
      it('should emit an ON_UPDATE event with the correct payload', () => {
        // Arrange
        const userId = 1;
        const userEmail = 'test@example.com';
  
        // Act
        service.emitUserUpdateEvent(userId, userEmail);
  
        // Assert
        expect(eventEmitter.emit).toHaveBeenCalledWith(
          UserEvent.ON_UPDATE,
          new OnUserUpdateEvent(userId, userEmail),
        );
      });
    });
  
    describe('emitUserDeleteEvent', () => {
      it('should emit an ON_REMOVE event with the correct payload', () => {
        // Arrange
        const userId = 1;
  
        // Act
        service.emitUserDeleteEvent(userId);
  
        // Assert
        expect(eventEmitter.emit).toHaveBeenCalledWith(
          UserEvent.ON_REMOVE,
          new OnUserRemoveEvent(userId),
        );
      });
    });
  });