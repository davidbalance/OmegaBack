import { TestBed } from "@automock/jest";
import { MedicalClientRepository } from "../repositories/medical-client.repository";
import { MedicalClientDoctorPaginationService } from "./medical-client-doctor-pagination.service";
import { mockMedicalClientEntity } from "../stub/medical-client-entity.stub";

describe('MedicalClientDoctorPaginationService', () => {
  let service: MedicalClientDoctorPaginationService;
  let repository: jest.Mocked<MedicalClientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalClientDoctorPaginationService).compile();

    service = unit;
    repository = unitRef.get(MedicalClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('queryBuilder', () => {
    const search = 'test';
    const page = 0;
    const take = 10;
    const extras = '1234567890';

    const mockedArea = mockMedicalClientEntity();
    const expectedData = mockedArea;

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoin: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockedArea)
      } as any);
    });

    it('should build a query', async () => {
      // Arrange
      // Act
      const result = await service.find({ search, page, take }, extras);

      // Assert
      expect(repository.query).toHaveBeenCalledWith('client');
      expect(repository.query().leftJoin).toHaveBeenCalledWith('client.medicalOrders', 'order');
      expect(repository.query().innerJoin).toHaveBeenCalledWith('order.results', 'result', 'result.doctorDni = :dni', { dni: extras });
      expect(repository.query().select).toHaveBeenCalledWith('client.dni', 'dni');
      expect(repository.query().distinct).toHaveBeenCalledWith(true);
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(1, 'client.name', 'name');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(2, 'client.lastname', 'lastname');
      expect(repository.query().addSelect).toHaveBeenNthCalledWith(3, 'client.createAt', 'createAt');
      expect(repository.query().where).toHaveBeenCalledWith('client.dni LIKE :filter', { filter: `%${search}%` });
      expect(repository.query().orWhere).toHaveBeenCalledWith('client.name LIKE :filter', { filter: `%${search}%` });
      expect(repository.query().orWhere).toHaveBeenCalledWith('client.lastname LIKE :filter', { filter: `%${search}%` });
      expect(repository.query().limit).toHaveBeenCalledWith(take);
      expect(repository.query().offset).toHaveBeenCalledWith(page);
      expect(repository.query().getRawMany).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });

    it('should build a query with field', async () => {
      // Arrange
      const field: string = 'name';
      // Act
      const result = await service.find({ search, page, take, field }, extras);

      // Assert
      expect(repository.query().orderBy).toHaveBeenCalledWith(field, 'ASC');
      expect(result).toEqual(expectedData);
    });

    it('should build a query with field and order', async () => {
      // Arrange
      const field: string = 'name';
      const order: any = 'desc';
      // Act
      const result = await service.find({ search, page, take, field, order }, extras);

      // Assert
      expect(repository.query().orderBy).toHaveBeenCalledWith(field, order.toUpperCase());
      expect(result).toEqual(expectedData);
    });
  });
});
