import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { Injectable, Inject, Logger } from "@nestjs/common";
import { MedicalReportRepository } from "../repositories/medical-report.repository";

@Injectable()
export class MedicalReportFileManagementService implements FileManagementService<number> {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
  ) { }
  
  uploadFile(key: number, file: Express.Multer.File): string | Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getFilePath(key: number): Promise<string> {
    const medicalReport = await this.repository
      .query('medical-report')
      .select('medical-report.fileAddress', 'filepath')
      .where('medical-report.id = :id', { id: key })
      .getRawOne<{ filepath: string }>();
    return medicalReport.filepath;
  }

  async removeFile(key: number): Promise<boolean> {
    try {
      const filepath = await this.getFilePath(key);
      await this.storage.deleteFile(filepath);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
