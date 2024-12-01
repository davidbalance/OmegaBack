import { ChecklistService } from './checklist.service';
import { MedicalOrderChecklistService } from '@/medical/medical-order/services/medical-order-checklist.service';
import { MedicalResultManagementService } from '@/medical/medical-result/services/medical-result-management.service';
import { PdfManagerService } from '@/shared/pdf-manager/pdf-manager.service';
import { FS } from '@/shared/nest-ext/fs/fs.type';
import { Path } from '@/shared/nest-ext/path/path.type';
import { TestBed } from '@automock/jest';
import { NEST_PATH } from '@/shared/nest-ext/path/inject-token';
import { NEST_FS } from '@/shared/nest-ext/fs/inject-token';
import { mockMedicalOrderEntity } from '@/medical/medical-order/stubs/medical-order-entity.stub';
import { Checklist } from '../dto/response/checklist.base.dto';
import { mockMedicalResult } from '@/medical/medical-result/stub/medical-result.stub';


describe('ChecklistService', () => {
  let service: ChecklistService;
  let checklistService: jest.Mocked<MedicalOrderChecklistService>;
  let exam: jest.Mocked<MedicalResultManagementService>;
  let pdf: jest.Mocked<PdfManagerService>;
  let path: jest.Mocked<Path>;
  let fs: jest.Mocked<FS>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ChecklistService).compile();

    service = unit;
    checklistService = unitRef.get(MedicalOrderChecklistService);
    exam = unitRef.get(MedicalResultManagementService);
    pdf = unitRef.get(PdfManagerService);
    path = unitRef.get(NEST_PATH);
    fs = unitRef.get(NEST_FS);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {

    const id: number = 1;
    const mockedMedicalOrder = mockMedicalOrderEntity();
    const expectedValue: Checklist = {
      clientName: mockedMedicalOrder.client.name,
      clientLastname: mockedMedicalOrder.client.lastname,
      clientDni: mockedMedicalOrder.client.dni,
      jobPosition: mockedMedicalOrder.client.jobPositionName,
      process: mockedMedicalOrder.process,
      companyName: mockedMedicalOrder.companyName,
      companyRuc: mockedMedicalOrder.companyRuc,
      createAt: mockedMedicalOrder.createAt,
      exams: mockedMedicalOrder.results
    }

    it('should find one checklist', async () => {
      // Arrange
      checklistService.findOne.mockResolvedValue(mockedMedicalOrder);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(checklistService.findOne).toHaveBeenCalledWith(id);
      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedValue));
    });
  });

  describe('updateItemStatus', () => {

    const id: number = 1;
    const data: boolean = true;
    const mockedResult = mockMedicalResult();
    const expectedValue = mockedResult;

    it('should update on item from the checklist', async () => {
      // Arrange
      exam.updateOne.mockResolvedValue(mockedResult);

      // Act
      const result = await service.updateItemStatus(id, data);

      // Assert
      expect(exam.updateOne).toHaveBeenCalledWith(id, { checklistStatus: data });
      expect(result).toBe(expectedValue);
    });
  });

  describe('download', () => {

    const id: number = 1;
    const mockedMedicalOrder = mockMedicalOrderEntity();
    const mockedPath: string = '/path/to/file.png';
    const mockedBuffer: Buffer = Buffer.from('Test buffer');
    const expectedValue = mockedBuffer;
    const mockedChecklist: Checklist = {
      clientDni: mockedMedicalOrder.client.dni,
      clientName: mockedMedicalOrder.client.name,
      clientLastname: mockedMedicalOrder.client.lastname,
      jobPosition: mockedMedicalOrder.client.jobPositionName,
      process: mockedMedicalOrder.process,
      companyRuc: mockedMedicalOrder.companyRuc,
      companyName: mockedMedicalOrder.companyRuc,
      createAt: mockedMedicalOrder.createAt,
      exams: mockedMedicalOrder.results
    }

    it('should retrive a buffer', async () => {
      // Arrange
      checklistService.findOne.mockResolvedValue(mockedMedicalOrder);
      path.resolve.mockReturnValue(mockedPath);
      fs.readFileSync.mockReturnValue(mockedBuffer);
      pdf.craft.mockResolvedValue(mockedBuffer);

      // Act
      const result = await service.download(id);

      // Assert
      expect(checklistService.findOne).toHaveBeenCalledWith(id);
      expect(path.resolve).toHaveBeenCalledWith('static/images/omega-variant.png');
      expect(fs.readFileSync).toHaveBeenCalledWith(mockedPath);
      expect(pdf.craft).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toBe(expectedValue);
    });
  });

});
