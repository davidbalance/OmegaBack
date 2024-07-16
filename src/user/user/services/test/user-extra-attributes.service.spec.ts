import { TestBed } from '@automock/jest';
import { UserRepository } from '../../repositories/user.repository';
import { mockUser } from './stub/user-management.stub';
import { UserExtraAttributeRepository } from '../../repositories/user-extra-attribute.repository';
import { POSTUserExtraAttributeRequestDto } from '../../dtos/post.user-extra-attribute.dto';
import { UserExtraAttributeService } from '../user-extra-attributes.service';
import { mockUserAttribute } from './stub/user-extra-attribute.stub';

describe('User Extra Attribute Service', () => {
    let service: UserExtraAttributeService;
    let userRepository: jest.Mocked<UserRepository>;
    let attributeRepository: jest.Mocked<UserExtraAttributeRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserExtraAttributeService).compile();

        service = unit;
        userRepository = unitRef.get(UserRepository);
        attributeRepository = unitRef.get(UserExtraAttributeRepository);

        jest.clearAllMocks();
    });

    describe('assignAttribute', () => {

        const mockDto: POSTUserExtraAttributeRequestDto = {
            name: 'my-stub-attribute',
            value: 'My attribute value'
        };

        const id: number = 1;

        it('should update attribute if it already exists', async () => {

            userRepository.findOne.mockResolvedValueOnce(mockUser);
            attributeRepository.findOneAndUpdate.mockResolvedValueOnce(undefined);

            await service.assignAttribute(id, mockDto);

            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: id },
                relations: { extraAttributes: true },
            });
            expect(attributeRepository.findOneAndUpdate).toHaveBeenCalledWith(
                { id: id },
                { value: mockDto.value }
            );
        });

        it('should create attribute if it does not exist', async () => {

            userRepository.findOne.mockResolvedValueOnce(mockUser);
            attributeRepository.create.mockResolvedValueOnce(undefined);

            const newMockUserAttribute = { ...mockDto, name: 'not-matched-name' };

            await service.assignAttribute(id, newMockUserAttribute);

            expect(userRepository.findOne)
                .toHaveBeenCalledWith({
                    where: { id: id },
                    relations: { extraAttributes: true },
                });

            expect(attributeRepository.create)
                .toHaveBeenCalledWith({
                    ...newMockUserAttribute,
                    user: mockUser,
                });
        });
    });

    describe('findUserAttribute', () => {
        const id: number = 1;
        const attributeName: string = 'my-attribute-name';

        it('should return user attribute by name', async () => {

            attributeRepository.query.mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValueOnce(mockUserAttribute),
            } as any);

            const result = await service.findUserAttribute(id, attributeName);

            expect(attributeRepository.query).toHaveBeenCalledWith('attribute');
            expect(result).toEqual(mockUserAttribute);
        });
    });

    describe('delete', () => {
        const id: number = 1;
        it('should delete user attribute by id', async () => {
            attributeRepository.findOneAndDelete.mockResolvedValueOnce(undefined);

            await service.delete(id);

            expect(attributeRepository.findOneAndDelete).toHaveBeenCalledWith({ id: id });
        });
    });
});
