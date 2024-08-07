import { TestBed } from "@automock/jest";
import { UserCredentialService } from "../../services/user-credential.service";
import { UserOnEventCredentialListener } from "../user-on-event-credential.listener";
import { OnUserRemoveEvent, OnUserUpdateEvent } from "@/shared/events/user.event";

describe('UserOnEventCredentialListener', () => {
    let listener: UserOnEventCredentialListener;
    let service: jest.Mocked<UserCredentialService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserOnEventCredentialListener).compile();

        listener = unit;
        service = unitRef.get(UserCredentialService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findOneCredentialAndUpdateUsername', () => {
        const userId = 1;
        const email = 'new-email@example.com';
        const updateEvent: OnUserUpdateEvent = {
            id: userId,
            email: email,
        };

        it('should call updateEmailByUser on the UserCredentialService with the correct parameters', async () => {
            // Act
            await listener.findOneCredentialAndUpdateUsername(updateEvent);

            // Assert
            expect(service.updateEmailByUser).toHaveBeenCalledWith(userId, email);
        });
    });

    describe('findOneCredentialAndDelete', () => {
        const userId = 1;
        const removeEvent: OnUserRemoveEvent = {
            id: userId,
        };

        it('should call deleteOneByUser on the UserCredentialService with the correct parameters', async () => {
            // Act
            await listener.findOneCredentialAndDelete(removeEvent);

            // Assert
            expect(service.deleteOneByUser).toHaveBeenCalledWith(userId);
        });
    });
});