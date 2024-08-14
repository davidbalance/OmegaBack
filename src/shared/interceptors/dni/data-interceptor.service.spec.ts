import { TestBed } from "@automock/jest";
import { DataInterceptorService } from "./data-interceptor.service";
import { mockUser } from "@/user/user/services/test/stub/user-management.stub";
import { UserManagementService } from "@/user/user/services/user-management.service";

describe('DataInterceptorService', () => {
    let service: DataInterceptorService;
    let userService: jest.Mocked<UserManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DataInterceptorService).compile();

        service = unit;
        userService = unitRef.get(UserManagementService)
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getDni', () => {
        const userId = 1;
        const mockedUser = mockUser();

        it('should return the DNI of the user', async () => {
            // Arrange
            userService.findOne.mockResolvedValueOnce(mockedUser);

            // Act
            const dni = await service.getDni(userId);

            // Assert
            expect(dni).toBe(mockedUser.dni);
            expect(userService.findOne).toHaveBeenCalledWith(userId);
        });
    });
});
