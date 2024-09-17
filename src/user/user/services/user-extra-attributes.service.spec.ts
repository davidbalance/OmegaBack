import { TestBed } from "@automock/jest";
import { UserExtraAttributeRepository } from "../repositories/user-extra-attribute.repository";
import { UserRepository } from "../repositories/user.repository";
import { UserExtraAttributeService } from "./user-extra-attributes.service";
import { mockUserEntity } from "../stub/user-entity.stub";
import { PostUserExtraAttributeRequestDto } from "../dtos/request/user-attribute.post.dto";
import { mockUserAttributeEntities, mockUserAttributeEntity } from "../stub/user-attribute-entity.stub";

describe('UserExtraAttributeService', () => {
    let service: UserExtraAttributeService;
    let userRepository: jest.Mocked<UserRepository>;
    let attributeRepository: jest.Mocked<UserExtraAttributeRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(UserExtraAttributeService).compile();

        service = unit;
        userRepository = unitRef.get(UserRepository);
        attributeRepository = unitRef.get(UserExtraAttributeRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('assignAttribute', () => {
        const userId = 1;
        const attribute: PostUserExtraAttributeRequestDto = { name: 'role', value: 'admin' };
        const mockedUser = mockUserEntity();

        it('should update an existing attribute', async () => {
            const attribute: any = { name: 'role', value: 'custom value', id: 1 };
            // Arrange
            userRepository.findOne.mockResolvedValue({ ...mockedUser, extraAttributes: [attribute] });

            // Act
            await service.assignAttribute(userId, attribute);

            // Assert
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: userId },
                relations: { extraAttributes: true }
            });
            expect(attributeRepository.findOneAndUpdate).toHaveBeenCalledWith(
                { id: attribute.id },
                { value: attribute.value }
            );
            expect(attributeRepository.create).not.toHaveBeenCalled();
        });

        it('should create a new attribute', async () => {
            // Arrange
            userRepository.findOne.mockResolvedValue({ ...mockedUser, extraAttributes: [] });

            // Act
            await service.assignAttribute(userId, attribute);

            // Assert
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: userId },
                relations: { extraAttributes: true }
            });
            expect(attributeRepository.findOneAndUpdate).not.toHaveBeenCalled();
            expect(attributeRepository.create).toHaveBeenCalledWith({ ...attribute, user: mockedUser });
        });
    });

    describe('findAttribute', () => {
        const userId = 1;
        const attributeName = 'role';
        const mockedAttribute = mockUserAttributeEntity();

        it('should find an attribute by id and name', async () => {
            // Arrange
            attributeRepository.query.mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValue(mockedAttribute)
            } as any);

            // Act
            const result = await service.findAttribute(userId, attributeName);

            // Assert
            expect(attributeRepository.query).toHaveBeenCalledWith('attribute');
            expect(attributeRepository.query().leftJoin).toHaveBeenCalledWith('attribute.user', 'user');
            expect(attributeRepository.query().where).toHaveBeenCalledWith('attribute.name = :name', { name: attributeName });
            expect(attributeRepository.query().andWhere).toHaveBeenCalledWith('user.id = :id', { id: userId });
            expect(result).toEqual(mockedAttribute);
        });
    });

    describe('delete', () => {
        it('should delete an attribute by id', async () => {
            // Arrange
            const attributeId = 1;

            // Act
            await service.delete(attributeId);

            // Assert
            expect(attributeRepository.findOneAndDelete).toHaveBeenCalledWith({ id: attributeId });
        });
    });
});