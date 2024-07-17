import { DoctorFileManagementService } from '../doctor-file-management.service';
import { DoctorRepository } from '../../doctor.repository';
import { TestBed } from '@automock/jest';
import { mockDoctor } from './stub/doctor.stub';
import { INJECT_STORAGE_MANAGER, StorageManager } from '@/shared/storage-manager';

describe('DoctorFileManagementService', () => {
  let service: DoctorFileManagementService;
  let repository: jest.Mocked<DoctorRepository>;
  let storage: jest.Mocked<StorageManager>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorFileManagementService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
    storage = unitRef.get(INJECT_STORAGE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const id: number = 1;
    const signature: any = {
      originalname: 'test.png',
      buffer: Buffer.from('filecontent'),
    };

    it('should upload file successfully', async () => {

      repository.findOne.mockResolvedValueOnce(mockDoctor);
      storage.saveFile.mockResolvedValueOnce(signature.originalname);
      repository.findOneAndUpdate.mockResolvedValueOnce({ ...mockDoctor, hasFile: true });

      await service.uploadFile(id, signature);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
        select: {
          user: { dni: true }
        }
      });
      expect(storage.saveFile).toHaveBeenCalledWith(
        signature.buffer,
        '.png',
        expect.any(String),
        mockDoctor.user.dni
      );
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, { hasFile: true });

    });

  })
});
