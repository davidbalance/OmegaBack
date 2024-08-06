import { TestBed } from "@automock/jest";
import { DiseaseGroupSelectorService } from "../services/disease-group-selector.service";
import { DiseaseGroupSelectorController } from "./disease-group-selector.controller";
import { mockDiseaseGroupOptions } from "../services/test/stub/disease-group.selector.stub";
import { GetDiseaseGroupSelectorOptionArrayResponseDto } from "../dtos/response/get.disease-group-selector.response.dto";

describe('DiseaseGroupSelectorController', () => {
    let controller: DiseaseGroupSelectorController;
    let service: jest.Mocked<DiseaseGroupSelectorService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DiseaseGroupSelectorController).compile();

        controller = unit;
        service = unitRef.get(DiseaseGroupSelectorService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findSelectorOptions', () => {
        const mockOptions = mockDiseaseGroupOptions();
        const mockResponse: GetDiseaseGroupSelectorOptionArrayResponseDto = { options: mockOptions };

        it('should call the service to find selector options', async () => {
            // Arrange
            service.find.mockResolvedValue(mockOptions);

            // Act
            const result = await controller.findSelectorOptions();

            // Assert
            expect(service.find).toHaveBeenCalled();
            expect(result).toEqual(mockResponse);
        });
    });
});