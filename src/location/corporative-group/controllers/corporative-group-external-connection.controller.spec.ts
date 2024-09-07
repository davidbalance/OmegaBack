import { CorporativeGroupExternalConnectionController } from './corporative-group-external-connection.controller'

describe('CorporativeGroupExternalConnectionController', () => {
    let controller: CorporativeGroupExternalConnectionController;

    it('', () => {
        expect(controller).toBeDefined();
    })
    /*     let service: jest.Mocked<CorporativeGroupExternalConnectionService>;
    
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
        }); */
});