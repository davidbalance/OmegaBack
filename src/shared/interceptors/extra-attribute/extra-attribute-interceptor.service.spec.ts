import { TestBed } from "@automock/jest";
import { ExtraAttributeInterceptorService } from "./extra-attribute-interceptor.service";
import { mockUser } from "@/user/user/services/test/stub/user-management.stub";
import { UserManagementService } from "@/user/user/services/user-management.service";
import { NotFoundException } from "@nestjs/common";

describe('ExtraAttributeInterceptorService', () => {
    let service: ExtraAttributeInterceptorService;
    let userService: jest.Mocked<UserManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExtraAttributeInterceptorService).compile();

        service = unit;
        userService = unitRef.get(UserManagementService)
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getExtraAttribute', () => {
        const userId = 1;
        const attributeName = 'my-stub-attribute';
        const mockedUser = mockUser();

        it('should return the value of the extra attribute if it exists', async () => {
            // Arrange
            userService.findOne.mockResolvedValueOnce(mockedUser);

            // Act
            const attributeValue = await service.getExtraAttribute(userId, attributeName);

            // Assert
            expect(attributeValue).toBe(mockedUser.extraAttributes.find(e => e.name === attributeName)?.value);
            expect(userService.findOne).toHaveBeenCalledWith(userId);
        });

        it('should throw a NotFoundException if the extra attribute does not exist', async () => {
            // Arrange
            userService.findOne.mockResolvedValueOnce(mockedUser);

            // Act & Assert
            await expect(service.getExtraAttribute(userId, 'invalid-attribute')).rejects.toThrow(NotFoundException);
            expect(userService.findOne).toHaveBeenCalledWith(userId);
        });
    });
});