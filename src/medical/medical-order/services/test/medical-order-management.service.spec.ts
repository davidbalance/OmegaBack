import { TestBed } from "@automock/jest";
import { MedicalOrderRepository } from "../../repositories/medical-order.repository";
import { MedicalOrderManagementService } from "../medical-order-management.service";
import { mockMedicalOrder, mockMedicalOrders } from "./stub/medical-order.stub";
import { MedicalOrder } from "../../entities/medical-order.entity";

describe('MedicalOrderManagementService', () => {
  let service: MedicalOrderManagementService;
  let repository: jest.Mocked<MedicalOrderRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderManagementService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedOrders = mockMedicalOrders();

    it('should return all medical orders', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedOrders);

      // Act
      const result = await service.find();

      // Assert
      expect(result).toEqual(mockedOrders);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const id = 1;
    const mockedOrder = mockMedicalOrder();

    it('should return the medical order with the given id', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedOrder);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockedOrder);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: id } });
    });
  });

  describe('findAllByPatient', () => {
    const dni = '1234567890';
    const mockedOrders = mockMedicalOrders();

    it('should return all medical orders for the given patient', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedOrders);

      // Act
      const result = await service.findAllByPatient(dni);

      // Assert
      expect(result).toEqual(mockedOrders);
      expect(repository.find).toHaveBeenCalledWith({
        where: { client: { dni } },
        relations: {
          results: {
            diseases: true
          }
        }
      });
    });
  });

  describe('findAllByPatientAndDoctor', () => {
    const patient = '1234567890';
    const doctor = '1234567890';
    const mockedOrders = mockMedicalOrders();

    beforeEach(() => {
      repository.query.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(mockedOrders)
      } as any);
    });

    it('should return all medical orders for the given patient and doctor', async () => {
      // Arrange
      // Act
      const result = await service.findAllByPatientAndDoctor(patient, doctor);

      // Assert
      expect(result).toEqual(mockedOrders);
      expect(repository.query).toHaveBeenCalledWith('medicalOrder');
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(1, 'medicalOrder.results', 'medicalResult', 'medicalResult.doctorDni = :doctor', { doctor });
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(2, 'medicalResult.report', 'medicalReport');
      expect(repository.query().leftJoinAndSelect).toHaveBeenNthCalledWith(3, 'medicalOrder.client', 'medicalClient');
      expect(repository.query().where).toHaveBeenCalledWith('medicalClient.dni = :patient', { patient });
      expect(repository.query().andWhere).toHaveBeenCalledWith('medicalResult.doctorDni = :doctor', { doctor });
      expect(repository.query().getMany).toHaveBeenCalled();
    });
  });

  describe('updateOne', () => {
    const id = 1;
    const data: Partial<MedicalOrder> = {
      process: 'Updated Process'
    };
    const mockedOrder = mockMedicalOrder();

    it('should update the medical order with the given id', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedOrder);

      // Act
      const result = await service.updateOne(id, data);

      // Assert
      expect(result).toEqual(mockedOrder);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, data);
    });
  });

  describe('deleteOne', () => {
    const id = 1;

    it('should delete the medical order with the given id', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValueOnce(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });

});