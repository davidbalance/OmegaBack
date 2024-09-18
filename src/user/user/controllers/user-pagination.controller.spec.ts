import { TestBed } from "@automock/jest";
import { UserPaginationService } from "../services/user-pagination.service";
import { UserPaginationController } from "./user-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockUsers } from "../stub/user.stub";

describe('UserPaginationController', () => {
  let controller: UserPaginationController;
  let service: jest.Mocked<UserPaginationService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserPaginationController).compile();
    controller = unit;
    service = unitRef.get(UserPaginationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedExams = mockUsers();
    const expectedData = { data: mockedExams };

    it('should call the service to find an area', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedExams);

      // Act
      const result = await controller.find(subtype, query);

      // Assert
      expect(service.find).toHaveBeenCalledWith(query, subtype);
      expect(result).toEqual(expectedData);
    });
  });

  describe('count', () => {
    const subtype: number = 1;
    const query: FilterMetaDto = { page: 0, take: 100 }
    const mockedCount: number = 1;
    const expectedData = { pages: mockedCount };

    it('should call the service to count areas', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedCount);

      // Act
      const result = await controller.count(subtype, query);

      // Assert
      expect(service.count).toHaveBeenCalledWith(query, subtype);
      expect(result).toEqual(expectedData);
    });
  });
});