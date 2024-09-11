import { TestBed } from '@automock/jest';
import { CorporativeGroupExternalConnectionController } from './corporative-group-external-connection.controller'
import { CorporativeGroupExternalConnectionService } from '../services/corporative-group-external-connection.service';
import { PostExternalCorporativeGroupRequestDto } from '../dtos/request/external-corporative-group.post.dto';
import { mockExternalCorporativeGroup } from '../stub/external-corporative-group.stub';
import { PatchExternalCorporativeGroupRequestDto } from '../dtos/request/external-corporative-group.patch.dto';

describe('CorporativeGroupExternalConnectionController', () => {
    let controller: CorporativeGroupExternalConnectionController;
    let service: jest.Mocked<CorporativeGroupExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CorporativeGroupExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(CorporativeGroupExternalConnectionService);
    });


    describe('create', () => {
        const source = 'test-source';
        const key = 'test-key';
        const mockDto: PostExternalCorporativeGroupRequestDto = {
            name: 'New Corporative Group',
        };
        const mockedGroup = mockExternalCorporativeGroup();
        const expectedValue = mockedGroup;

        it('should call the service to create a new corporative group', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedGroup);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'test-source';
        const key = 'test-key';
        const mockDto: PatchExternalCorporativeGroupRequestDto = {
            name: 'Updated Corporative Group'
        };
        const mockedGroup = mockExternalCorporativeGroup();
        const expectedValue = mockedGroup;

        it('should call the service to update a corporative group', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedGroup);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });
});