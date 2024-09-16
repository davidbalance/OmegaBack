import { TestBed } from "@automock/jest";
import { DiseaseGroupOptionService } from "../services/disease-group-option.service";
import { DiseaseGroupOptionController } from "./disease-group-option.controller";
import { mockExtendedDiseaseGroups } from "../stub/extended-disease-group.stub";

describe('DiseaseGroupOptionController', () => {
  let controller: DiseaseGroupOptionController;
  let service: jest.Mocked<DiseaseGroupOptionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DiseaseGroupOptionController).compile();
    controller = unit;
    service = unitRef.get(DiseaseGroupOptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {

    const mockedDiseaseGroup = mockExtendedDiseaseGroups();
    const expectedData = { data: mockedDiseaseGroup };

    it('should call the service to find all the options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedDiseaseGroup);

      // Act
      const result = await controller.find();

      // Assert
      expect(result).toEqual(expectedData);
    });
  });
});