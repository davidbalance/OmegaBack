import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { FileManagementService } from "@/shared/utils/bases/base.file-service";
import { fileResultPath } from "@/shared/utils";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { extname } from "path";

@Injectable()
export class MedicalResultFileManagementService implements FileManagementService<number> {

  constructor(
    @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
  ) { }

  async uploadFile(key: number, file: Express.Multer.File): Promise<string> {

    const medicalResult = await this.repository
      .query('medical_result')
      .leftJoinAndSelect('medical_result.order', 'medical_order')
      .leftJoinAndSelect('medical_order.client', 'medical_client')
      .select('medical_result.examName', 'examName')
      .addSelect('medical_order.id', 'orderId')
      .addSelect('medical_client.dni', 'clientDni')
      .where('medical_result.id = :id', { id: key })
      .getRawOne<{ examName: string, orderId: number, clientDni: string }>();

    if (!medicalResult) {
      throw new NotFoundException('Medical result not found to associate file');
    }

    const { examName, clientDni, orderId } = medicalResult;

    const medicalResultPath = fileResultPath({ dni: clientDni, order: orderId });
    const extension = extname(file.originalname);
    const filepath = await this.storage.saveFile(
      file.buffer,
      extension,
      medicalResultPath,
      examName.toLocaleLowerCase().replace(/\s/g, '_')
    );

    await this.repository.findOneAndUpdate({ id: key }, { filePath: filepath, hasFile: true });
    return filepath;
  }

  async getFilePath(key: number): Promise<string> {
    const medicalResult = await this.repository
      .query('medical-result')
      .select('medical-result.filePath', 'filepath')
      .where('medical-result.id = :id', { id: key })
      .getRawOne<{ filepath: string }>();
    return medicalResult.filepath;
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
