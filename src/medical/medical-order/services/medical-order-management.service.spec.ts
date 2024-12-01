import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../repositories/medical-order.repository";
import { MedicalOrderManagementService } from "./medical-order-management.service";
import { mockMedicalOrderEntities, mockMedicalOrderEntity } from "../stubs/medical-order-entity.stub";
import { MedicalOrderRequestDto } from "../dtos/request/medical-order.base.dto";
import { MedicalClientManagementService } from "@/medical/medical-client/services/medical-client-management.service";
import { mockMedicalClient } from "@/medical/medical-client/stub/medical-client.stub";

describe('MedicalOrderManagementService', () => {
  let service: MedicalOrderManagementService;
  let repository: jest.Mocked<MedicalOrderRepository>;
  let clientService: jest.Mocked<MedicalClientManagementService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
    clientService = unitRef.get(MedicalClientManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return an array of medical orders', async () => {
      // Arrange
      const mockedOrders = mockMedicalOrderEntities();
      repository.find.mockResolvedValue(mockedOrders);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockedOrders);
    });
  });

  describe('findOne', () => {
    it('should return a medical order by ID', async () => {
      // Arrange
      const id = 1;
      const mockedOrder = mockMedicalOrderEntity();
      repository.findOne.mockResolvedValue(mockedOrder);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockedOrder);
    });
  });

  describe('create', () => {
    it('should create a medical order', async () => {
      // Arrange
      const data: MedicalOrderRequestDto = {
        branchName: 'Branch',
        companyName: 'Company',
        corporativeName: "Corporative",
        companyRuc: "1234567890001",
        patientDni: "1234567890",
        process: "SAMPLE"
      };
      const mockedClient = mockMedicalClient();
      const mockedOrder = mockMedicalOrderEntity();
      const expectedValue = mockedOrder;

      clientService.findOneByDni.mockResolvedValue(mockedClient);
      repository.create.mockResolvedValue(mockedOrder);

      // Act
      const result = await service.create(data);

      // Assert
      const { patientDni, ...order } = data;
      expect(clientService.findOneByDni).toHaveBeenCalledWith(patientDni);
      expect(repository.create).toHaveBeenCalledWith({ ...order, client: mockedClient });
      expect(result).toEqual(expectedValue);
    });
  });

  describe('updateOne', () => {
    it('should update a medical order', async () => {
      // Arrange
      const id = 1;
      const data = { mailStatus: true };
      const mockedOrder = mockMedicalOrderEntity();
      repository.findOneAndUpdate.mockResolvedValue(mockedOrder);

      // Act
      const result = await service.updateOne(id, data);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, data);
      expect(result).toEqual(mockedOrder);
    });
  });

  describe('deleteOne', () => {
    it('should delete a medical order', async () => {
      // Arrange
      const id = 1;
      repository.findOneAndDelete.mockResolvedValue(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });
});