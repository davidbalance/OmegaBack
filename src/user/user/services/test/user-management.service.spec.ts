import { TestBed } from '@automock/jest';
import { UserManagementService } from '../user-management.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserEventService } from '../user-event.service';
import { mockUser, mockUsers } from './stub/user-management.stub';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PostUserRequestDto } from '../../dtos/request/post.user.request.dto';
import { PatchUserRequestDto } from '../../dtos/request/patch.user.dto';

describe('User Management Service', () => {
    let service: UserManagementService;
    let repository: jest.Mocked<UserRepository>;
    let eventService: jest.Mocked<UserEventService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserManagementService).compile();

        service = unit;
        repository = unitRef.get(UserRepository);
        eventService = unitRef.get(UserEventService);

        jest.clearAllMocks();
    });

    describe('create', () => {

        const mockedUser = mockUser();

        const mockDto: PostUserRequestDto = {
            dni: '1234567890',
            name: 'User',
            lastname: 'Stub',
            email: 'my-email-stub@email.com'
        };

        it('should throw ConflictException if user with same dni or email exists', async () => {
            repository.findOne.mockResolvedValueOnce(mockedUser);

            await expect(service.create(mockDto))
                .rejects
                .toThrow(ConflictException);
        });

        it('should create a new user if no conflict', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            repository.create.mockResolvedValueOnce(mockedUser);

            const result = await service.create(mockDto);

            expect(result).toEqual(mockedUser);
        });

        it('should throw a InternalServerException', async () => {
            repository.findOne.mockRejectedValueOnce(new InternalServerErrorException());
            await expect(service.create(mockDto))
                .rejects
                .toThrow(InternalServerErrorException);
        });

    });

    describe('find', () => {

        const mockedUsers = mockUsers();

        it('should return an array of users', async () => {
            repository.find.mockResolvedValueOnce(mockedUsers);
            const result = await service.find();
            expect(result).toEqual(mockedUsers);
        });
    });

    describe('findOne', () => {
        const mockedUser = mockUser();

        it('should return a user by id', async () => {
            repository.findOne.mockResolvedValueOnce(mockedUser);
            const result = await service.findOne(1);
            expect(result).toEqual(mockedUser);
        });
    });

    describe('findOneByDni', () => {
        const mockedUser = mockUser();

        it('should return a user by dni', async () => {
            repository.findOne.mockResolvedValueOnce(mockedUser);

            const result = await service.findOneByDni('123');

            expect(result).toEqual(mockedUser);
        });
    });

    describe('updateOne', () => {
        const id: number = 1;
        const mockedUser = mockUser();

        const mockDto: PatchUserRequestDto = {
            name: 'User',
            lastname: 'Stub'
        };

        it('should update a user and emit an update event', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedUser);

            const result = await service.updateOne(id, mockDto);

            expect(result).toEqual(mockedUser);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id: id }, mockDto);
        });
    });

    describe('deleteOne', () => {
        it('should delete a user and emit a delete event', async () => {
            repository.findOneAndDelete.mockResolvedValueOnce(undefined);

            await service.deleteOne(1);

            expect(eventService.emitUserDeleteEvent).toHaveBeenCalledWith(1);
        });
    });
});
