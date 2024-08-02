import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { Injectable, Inject, Logger, NotFoundException } from "@nestjs/common";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { fileReportPath } from "@/shared/utils";

@Injectable()
export class MedicalReportFileManagementService implements FileManagementService<number> {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
  ) { }

  async uploadFile(key: number, file: Express.Multer.File): Promise<string> {
    const medicalReport = await this.repository.findOne({
      where: { id: key },
      select: {
        examName: true,
        patientDni: true,
        order: true
      }
    });
    if (!medicalReport) {
      throw new NotFoundException('Medical report not found to associate file');
    }
    const { examName, patientDni, order } = medicalReport;

    const filepath = fileReportPath({ dni: patientDni, order: order });

    try {
      const output = await this.storage.saveFile(file.buffer, '.pdf', filepath, examName.toLocaleLowerCase().replace(/\s/g, '_'));
      await this.repository.findOneAndUpdate({ id: key }, { fileAddress: output, hasFile: true });
      return output;
    } catch (error) {
      await this.repository.findOneAndUpdate({ id: key }, { fileAddress: null, hasFile: false });
      throw error;
    }
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
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
