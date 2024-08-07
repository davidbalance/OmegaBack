import { TestBed } from "@automock/jest";
import { DiseaseSelectorController } from "./disease-selector.controller";
import { DiseaseSelectorService } from "../services/disease-selector.service";
import { SelectorOption } from "@/shared/utils/bases/base.selector";
import { GetDiseaseSelectorResponseDto } from "../dtos/response/get.disease-selector.response.dto";

describe('DiseaseSelectorController', () => {
  let controller: DiseaseSelectorController;
  let service: jest.Mocked<DiseaseSelectorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseSelectorController).compile();

    controller = unit;
    service = unitRef.get(DiseaseSelectorService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findSelectorOptions', () => {
    const group = 1;
    const mockOptions: SelectorOption<number>[] = [
      { key: 1, label: 'Disease 1' },
      { key: 2, label: 'Disease 2' },
    ];
    const mockResponse: GetDiseaseSelectorResponseDto = { options: mockOptions };

    it('should call the service to find selector options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockOptions);

      // Act
      const result = await controller.findSelectorOptions(group);

      // Assert
      expect(service.find).toHaveBeenCalledWith(group);
      expect(result).toEqual(mockResponse);
    });
  })
});