import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { IFileManagement, GenericFile } from "@/shared/utils/bases/base.file-service";
import { fileResultPath } from "@/shared/utils";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { UrlFileFetcherService } from "@/shared/url-file-fetcher/url-file-fetcher.service";
import { Base64Service } from "@/shared/base64/base64.service";
import { fileExtension } from "@/shared/utils/file-extension";
import { v4 } from "uuid";
import { MedicalResultEventService } from "./medical-result-event.service";
import { FILE_SYSTEM } from "@/shared/file-system/inject-token";
import { IFileSystem } from "@/shared/file-system/file-system.interface";
import { NEST_PATH } from "@/shared/nest-ext/path/inject-token";
import { Path } from "@/shared/nest-ext/path/path.type";

@Injectable()
export class MedicalResultFileManagementService implements IFileManagement<number> {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
    @Inject(UrlFileFetcherService) private readonly urlFile: UrlFileFetcherService,
    @Inject(Base64Service) private readonly base64: Base64Service,
    @Inject(MedicalResultEventService) private readonly eventService: MedicalResultEventService,
    @Inject(FILE_SYSTEM) private readonly fileSystem: IFileSystem,
    @Inject(NEST_PATH) private readonly path: Path
  ) { }

  async getFile(key: number): Promise<Buffer> {
    const medicalResult = await this.repository
      .query('medical-result')
      .select('medical-result.filePath', 'filepath')
      .where('medical-result.id = :id', { id: key })
      .getRawOne<{ filepath: string }>();
    try {
      const file = await this.fileSystem.read(medicalResult.filepath);
      return file;
    } catch (error) {
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      throw error;
    }
  }

  async uploadFile(key: number, file: GenericFile): Promise<string> {

    const medicalResult = await this.repository
      .query('result')
      .leftJoinAndSelect('result.order', 'order')
      .leftJoinAndSelect('order.client', 'client')
      .select('YEAR(order.createAt)', 'year')
      .addSelect('order.corporativeName', 'corporativeGroup')
      .addSelect('order.companyName', 'companyName')
      .addSelect('order.companyRuc', 'companyRuc')
      .addSelect('order.branchName', 'branch')
      .addSelect('client.dni', 'patientDni')
      .addSelect('client.name', 'clientName')
      .addSelect('client.lastname', 'clientLastname')
      .addSelect('result.examName', 'examName')
      .addSelect('order.id', 'orderId')
      .where('result.id = :id', { id: key })
      .getRawOne<{
        year: string,
        corporativeGroup: string,
        companyName: string,
        companyRuc: string,
        branch: string,
        patientDni: string,
        clientName: string,
        clientLastname: string,
        orderId: number
        examName: string,
      }>();

    if (!medicalResult) {
      throw new NotFoundException('Medical result not found to associate file');
    }

    const { clientName, clientLastname, orderId, examName, ...foldername } = medicalResult;

    const filepath = fileResultPath({ ...foldername, patientName: `${clientName} ${clientLastname}`, order: orderId });
    const filename = `${orderId.toString().padStart(9, '0')}_${examName.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, '_')}`;
    const extension = this.path.extname(file.originalname);
    try {
      const output = await this.fileSystem.write(filepath, file.buffer, { extension: extension, filename: filename });
      await this.repository.findOneAndUpdate({ id: key }, { filePath: `${output}`, hasFile: true });
      this.eventService.emitOnMedicalResultUploadFileEvent(key);
      return output;
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
      await this.fileSystem.delete(filepath);
      await this.repository.findOneAndUpdate({ id: key }, { hasFile: false });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

}
