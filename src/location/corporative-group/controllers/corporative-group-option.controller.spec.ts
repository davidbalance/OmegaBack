import { TestBed } from "@automock/jest";
import { CorporativeGroupOptionService } from "../services/corporative-group-option.service";
import { CorporativeGroupOptionController } from "./corporative-group-option.controller";
import { mockExtendedCorporativeGroups } from "../stub/extended-corporative-group.stub";

describe('CorporativeGroupOptionController', () => {
  let controller: CorporativeGroupOptionController;
  let service: jest.Mocked<CorporativeGroupOptionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupOptionController).compile();
    controller = unit;
    service = unitRef.get(CorporativeGroupOptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {

    const mockedCorporativeGroup = mockExtendedCorporativeGroups();
    const expectedData = { data: mockedCorporativeGroup };

    it('should call the service to find all the options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedCorporativeGroup);

      // Act
      const result = await controller.find();

      // Assert
      expect(result).toEqual(expectedData);
    });
  });
});