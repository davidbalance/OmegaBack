import { TestBed } from "@automock/jest";
import { UserRepository } from "../repositories/user.repository";
import { UserEventService } from "./user-event.service";
import { UserExtraAttributeService } from "./user-extra-attributes.service";
import { UserManagementService } from "./user-management.service";
import { PostUserRequestDto } from "../dtos/request/user.post.dto";
import { mockUserEntity } from "../stub/user-entity.stub";
import { ConflictException, NotFoundException } from "@nestjs/common";

describe('UserManagementService', () => {
    let service: UserManagementService;
    let repository: jest.Mocked<UserRepository>;
    let eventService: jest.Mocked<UserEventService>;
    let attributeService: jest.Mocked<UserExtraAttributeService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserManagementService).compile();

        service = unit;
        repository = unitRef.get(UserRepository);
        eventService = unitRef.get(UserEventService);
        attributeService = unitRef.get(UserExtraAttributeService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new user with DNI', async () => {
            // Arrange
            const mockDto: PostUserRequestDto = {
                name: 'John',
                lastname: 'Doe',
                dni: '1234567890',
                email: 'john.doe@example.com',
                role: 'admin'
            };
            const newUser = mockUserEntity();
            repository.findOne.mockRejectedValue(new NotFoundException());
            repository.create.mockResolvedValue(newUser);

            // Act
            const result = await service.create(mockDto);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ dni: mockDto.dni }, { email: mockDto.email }]
            });
            const { role, ...updatedMock } = mockDto;
            expect(repository.create).toHaveBeenCalledWith({ ...updatedMock, dniType: 'dni' });
            expect(attributeService.assignAttribute).toHaveBeenCalledWith(newUser.id, { name: 'role', value: mockDto.role });
            expect(result).toEqual(newUser);
        });

        it('should create a new user with PAS', async () => {
            // Arrange
            const mockDto: PostUserRequestDto = {
                name: 'John',
                lastname: 'Doe',
                dni: '12345678',
                email: 'john.doe@example.com',
                role: 'admin'
            };
            const newUser = mockUserEntity();
            repository.findOne.mockRejectedValue(new NotFoundException());
            repository.create.mockResolvedValue(newUser);

            // Act
            const result = await service.create(mockDto);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ dni: mockDto.dni }, { email: mockDto.email }]
            });

            const { role, ...updatedMock } = mockDto;
            expect(repository.create).toHaveBeenCalledWith({ ...updatedMock, dniType: 'pas' });
            expect(attributeService.assignAttribute).toHaveBeenCalledWith(newUser.id, { name: 'role', value: mockDto.role });
            expect(result).toEqual(newUser);
        });

        it('should throw a ConflictException if DNI or email is already in use', async () => {
            // Arrange
            const mockDto: PostUserRequestDto = {
                name: 'John',
                lastname: 'Doe',
                dni: '1234567890',
                email: 'john.doe@example.com',
                role: 'admin'
            };
            repository.findOne.mockResolvedValue(mockUserEntity());

            // Act & Assert
            await expect(service.create(mockDto)).rejects.toThrow(ConflictException);
            expect(repository.create).not.toHaveBeenCalled();
            expect(attributeService.assignAttribute).not.toHaveBeenCalled();
        });
    });

    describe('find', () => {
        it('should return an array of users', async () => {
            // Arrange
            const users = [mockUserEntity(), mockUserEntity()];
            repository.find.mockResolvedValue(users);

            // Act
            const result = await service.find();

            // Assert
            expect(repository.find).toHaveBeenCalledWith({
                where: { status: true, hasCredential: true, id: expect.any(Object) },
                select: { id: true, dni: true, email: true, name: true, lastname: true },
                cache: 1000 * 900
            });
            expect(result).toEqual(users);
        });
    });

    describe('findOne', () => {
        it('should return a user by ID', async () => {
            // Arrange
            const userId = 1;
            const user = mockUserEntity();
            repository.findOne.mockResolvedValue(user);

            // Act
            const result = await service.findOne(userId);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: userId },
                relations: { extraAttributes: true }
            });
            expect(result).toEqual(user);
        });
    });

    describe('findOneByDni', () => {
        it('should return a user by DNI', async () => {
            // Arrange
            const userDni = '1234567890';
            const user = mockUserEntity();
            repository.findOne.mockResolvedValue(user);

            // Act
            const result = await service.findOneByDni(userDni);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { dni: userDni },
                relations: { extraAttributes: true }
            });
            expect(result).toEqual(user);
        });
    });

    describe('updateOne', () => {
        it('should update a user', async () => {
            // Arrange
            const userId = 1;
            const updatedUser = mockUserEntity();
            repository.findOneAndUpdate.mockResolvedValue(updatedUser);

            // Act
            const result = await service.updateOne(userId, updatedUser);

            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: userId }, updatedUser);
            expect(result).toEqual(updatedUser);
        });
    });

    describe('deleteOne', () => {
        it('should delete a user by ID', async () => {
            // Arrange
            const userId = 1;

            // Act
            await service.deleteOne(userId);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id: userId });
            expect(eventService.emitUserDeleteEvent).toHaveBeenCalledWith(userId);
        });
    });
});