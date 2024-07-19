import { TestBed } from "@automock/jest";
import { CorporativeGroupRepository } from "../../repositories/corporative-group.repository";
import { CorporativeGroupManagementService } from "../corporative-group-management.service";
import { mockCorporativeGroups } from "./stub/corporative-group.stub";

describe('CorporativeGroupManagementService', () => {
  let service: CorporativeGroupManagementService;
  let repository: jest.Mocked<CorporativeGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupManagementService).compile();

    service = unit;
    repository = unitRef.get(CorporativeGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedGroups = mockCorporativeGroups();

    it('should return corporative groups', async () => {
      repository.find.mockResolvedValueOnce(mockedGroups);
      const result = await service.find();

      expect(result).toEqual(mockedGroups);
    });
  });
});