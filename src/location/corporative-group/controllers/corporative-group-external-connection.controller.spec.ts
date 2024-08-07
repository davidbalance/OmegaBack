import { TestBed } from "@automock/jest";
import { CorporativeGroupExternalConnectionController } from './corporative-group-external-connection.controller'
import { CorporativeGroupExternalConnectionService } from '../services/corporative-group-external-connection.service'
import { PostCorporativeGroupRequestDto } from "../dtos/request/post.corporative-group.dto";
import { mockCorporativeGroup } from "../services/test/stub/corporative-group.stub";
import { PostCorporativeGroupResponseDto } from "../dtos/response/post.corporative-group.response.dto";
import { PatchCorporativeGroupRequestDto } from "../dtos/request/patch.corporative-group.dto";
import { PatchCorporativeGroupResponseDto } from "../dtos/response/patch.corporative-group.response.dto";

describe('CorporativeGroupExternalConnectionController', () => {
    let controller: CorporativeGroupExternalConnectionController;
    let service: jest.Mocked<CorporativeGroupExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CorporativeGroupExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(CorporativeGroupExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostCorporativeGroupRequestDto = {
            name: 'New Corporative Group',
        };
        const mockedCorporativeGroup = mockCorporativeGroup();
        const mockedResponse: PostCorporativeGroupResponseDto = mockedCorporativeGroup;

        it('should call the service to create a new corporative group', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedCorporativeGroup);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockedResponse);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PatchCorporativeGroupRequestDto = {
            name: 'Updated Corporative Group'
        };
        const mockCorporativeGroupData = mockCorporativeGroup();
        const mockResponse: PatchCorporativeGroupResponseDto = mockCorporativeGroupData;

        it('should call the service to update a corporative group', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockCorporativeGroupData);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockResponse);
        });
    });
});