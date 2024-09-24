import { TestBed } from '@automock/jest';
import { MedicalOrderResultExternalService } from '../services/medical-order-result-external.service';
import { MedicalOrderResultExternalConnectionController } from './medical-order-result-external.controller';
import { PostExternalMedicalResultOrderRequestDto } from '../dtos/request/external-medical-result-order.post.dto';
import { ExternalBranchWithKeyRequestDto } from '@/location/branch/dtos/request/external-branch-with-key.post.dto';
import { mockExternalMedicalOrder } from '@/medical/medical-order/stubs/external-medical-order-entity.stub';
import { PostExternalMedicalOrderResultBase64RequestDto } from '../dtos/request/external-medical-result-order-upload-base64.post.dto';

describe('MedicalOrderResultExternalConnectionController', () => {
  let controller: MedicalOrderResultExternalConnectionController;
  let service: jest.Mocked<MedicalOrderResultExternalService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderResultExternalConnectionController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderResultExternalService);
  });

  describe('create', () => {
    const source = 'source';
    const key = 'key';
    const data: PostExternalMedicalResultOrderRequestDto = {
      results: [],
      branch: {} as ExternalBranchWithKeyRequestDto,
      patient: {} as any,
      process: ''
    };
    const mockedOrder = mockExternalMedicalOrder();
    const expectedValue = mockedOrder;

    it('should call the service to create a new medicalOrder', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedOrder);

      // Act
      const result = await controller.create(source, key, data);

      // Assert
      expect(service.create).toHaveBeenCalledWith({ source, key }, data);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('uploadBase64LaboratorioClinico', () => {
    const source = 'source';
    const key = 'key';
    const data: PostExternalMedicalOrderResultBase64RequestDto = {
      doctor: {} as any,
      base64: 'MyBase64File',
      mimetype: 'application/json'
    };
    const mockedOrder = mockExternalMedicalOrder();
    const expectedValue = mockedOrder;

    it('should call the service to upload a new base64 as LABORATORIO CLINICO', async () => {
      // Arrange
      service.uploadBase64LaboratorioClinico.mockResolvedValue(mockedOrder);

      // Act
      const result = await controller.uploadBase64LaboratorioClinico(source, key, data);

      // Assert
      expect(service.uploadBase64LaboratorioClinico).toHaveBeenCalledWith({ source, key }, data);
      expect(result).toEqual(expectedValue);
    });
  });
});
