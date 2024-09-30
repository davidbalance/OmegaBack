import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { INJECT_STORAGE_MANAGER, StorageManager } from "@/shared/storage-manager";
import { FileManagementService, GenericFile } from "@/shared/utils/bases/base.file-service";
import { fileResultPath } from "@/shared/utils";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { extname } from "path";
import { ReadStream } from "fs";
import { UrlFileFetcherService } from "@/shared/url-file-fetcher/url-file-fetcher.service";
import { Base64Service } from "@/shared/base64/base64.service";
import { fileExtension } from "@/shared/utils/file-extension";
import { v4 } from "uuid";
import { MedicalResultEventService } from "./medical-result-event.service";

@Injectable()
export class MedicalResultFileManagementService implements FileManagementService<number> {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
    @Inject(UrlFileFetcherService) private readonly urlFile: UrlFileFetcherService,
    @Inject(Base64Service) private readonly base64: Base64Service,
    @Inject(MedicalResultEventService) private readonly eventService: MedicalResultEventService,
    @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
  ) { }

  async getFile(key: number): Promise<ReadStream> {
    const medicalResult = await this.repository
      .query('medical-result')
      .select('medical-result.filePath', 'filepath')
      .where('medical-result.id = :id', { id: key })
      .getRawOne<{ filepath: string }>();
    try {
      const file = await this.storage.readFile(medicalResult.filepath);
      return file;
    } catch (error) {
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      throw error;
    }
  }

  async uploadFile(key: number, file: GenericFile): Promise<string> {

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
    try {
      const filepath = await this.storage.saveFile(
        file.buffer,
        extension,
        medicalResultPath,
        examName.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, '_')
      );

      await this.repository.findOneAndUpdate({ id: key }, { filePath: `${filepath}`, hasFile: true });
      this.eventService.emitOnMedicalResultUploadFileEvent(key);
      return filepath;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong when writting the file');
    }
  }

  async uploadFromUrl(key: number, url: string): Promise<string> {
    const file = await this.urlFile.fetch(url);
    return await this.uploadFile(key, { originalname: file.filename, ...file });
  }

  async uploadFromBase64(key: number, mimetype: string, base64: string): Promise<string> {
    const buffer = this.base64.toBuffer(base64);
    const extension = fileExtension(mimetype);
    const filename = `${v4()}${extension}`;
    return await this.uploadFile(key, { originalname: filename, mimetype: mimetype, buffer });
  }

  async getFilePath(key: number): Promise<string> {
    await this.getFile(key);

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
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

}
