import { IFileManagement, GenericFile } from "@/shared/utils/bases/base.file-service";
import { Injectable, Inject, Logger, NotFoundException } from "@nestjs/common";
import { MedicalReportRepository } from "../repositories/medical-report.repository";
import { fileReportPath } from "@/shared/utils";
import { FILE_SYSTEM } from "@/shared/file-system/inject-token";
import { IFileSystem } from "@/shared/file-system/file-system.interface";

@Injectable()
export class MedicalReportFileManagementService implements IFileManagement<number> {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository,
    @Inject(FILE_SYSTEM) private readonly fileSystem: IFileSystem,
  ) { }

  async getFile(key: number): Promise<Buffer> {
    const medicalReport = await this.repository
      .query('medical-report')
      .select('medical-report.fileAddress', 'filepath')
      .where('medical-report.id = :id', { id: key })
      .getRawOne<{ filepath: string }>();
    try {
      return await this.fileSystem.read(medicalReport.filepath);
    } catch (error) {
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      throw error;
    }
  }

  async uploadFile(key: number, file: GenericFile): Promise<string> {
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
    const filename = examName.toLocaleLowerCase().replace(/\s/g, '_');

    try {
      const output = await this.fileSystem.write(filepath, file.buffer, { extension: '.pdf', filename: filename });
      await this.repository.findOneAndUpdate({ id: key }, { fileAddress: output, hasFile: true });
      return output;
    } catch (error) {
      await this.repository.findOneAndUpdate({ id: key }, { fileAddress: null, hasFile: false });
      throw error;
    }
  }

  async getFilePath(key: number): Promise<string> {
    await this.getFile(key);

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
      await this.fileSystem.delete(filepath);
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
