import { FindFilePathService, RemoveFileService, fileResultPath } from "@/shared";
import { Injectable, Inject, Logger } from "@nestjs/common";
import { SendAttributeService } from "../send-attribute/send-attribute.service";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResult } from "../entities/result.entity";
import { MedicalReportService } from "@/medical/medical-report/medical-report.service";
import { PATCHMedicalReportRequestDto } from "@/medical/medical-report/dtos/medical-report.request.dto";
import { extname } from "path";
import { StorageManager } from "@/shared/storage-manager";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { PATCHMedicalResultDiseaseRequestDto, POSTMedicalResultDiseaseRequestDto } from "../dtos/medical-result.request.dto";
import { MedicalResultDisease } from "../entities/result-disease.entity";

@Injectable()
export class MedicalResultService implements
  FindFilePathService<number>,
  RemoveFileService<number> {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
    @Inject(MedicalReportService) private readonly reportService: MedicalReportService,
    @Inject(SendAttributeService) private readonly attributeService: SendAttributeService,
    @Inject(StorageManager) private readonly storageManager: StorageManager,
    @Inject(MedicalResultDiseaseRepository) private readonly diseaseRepository: MedicalResultDiseaseRepository
  ) { }

  /**
   * Obtiene la direccion donde se aloja un archivo.
   * @param key 
   * @returns 
   */
  async getpath(key: number): Promise<string> {
    const file = await this.repository.findOne({
      where: { id: key },
      select: {
        id: true,
        filePath: true
      }
    });
    return file.filePath;
  }

  /**
   * Elimina un archivo asociado a un resultado medico.
   * @param key 
   * @returns 
   */
  async removeFile(key: number): Promise<boolean> {
    try {
      const file = await this.repository.findOne({
        where: { id: key },
        select: {
          id: true,
          filePath: true
        }
      });
      this.storageManager.deleteFile(file.filePath);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  /**
   * Obtiene los resultados medicos presentes en el sistema.
   * @returns 
   */
  async find(): Promise<MedicalResult[]> {
    const results = await this.repository.find({
      select: {
        id: true,
        examName: true,
        diseases: {
          diseaseId: true,
          diseaseName: true,
          diseaseGroupId: true,
          diseaseGroupName: true,
          diseaseCommentary: true
        },
        report: {
          id: true,
          content: true
        }
      }
    });
    return results;
  }

  /**
   * Obtiene los resultados medicos asociados a un doctor.
   * @param doctor 
   * @returns 
   */
  async findResultsByDoctor(doctor: string): Promise<MedicalResult[]> {
    const results = await this.repository.find({
      where: { doctorDni: doctor },
      select: {
        id: true,
        examName: true,
        diseases: {
          diseaseId: true,
          diseaseName: true,
          diseaseGroupId: true,
          diseaseGroupName: true,
          diseaseCommentary: true
        },
        report: {
          id: true,
          content: true
        }
      }
    });

    return results;
  }

  /**
   * Encuentra un resultado medico y le asigna una morbilidad.
   * @param result
   * @param disease 
   * @param data 
   */
  async findOneResultAndInsertDisease(result: number, data: POSTMedicalResultDiseaseRequestDto): Promise<MedicalResultDisease> {
    const currentResult = await this.repository.findOne({ where: { id: result } });
    const currentDisease = await this.diseaseRepository.create({ ...data, result: currentResult });
    return currentDisease;
  }

  /**
   * Encuentra un resultado medico y actualiza una morbilidad.
   * @param result
   * @param disease 
   * @param data 
   */
  async findOneResultAndUpdateDisease(_: number, disease: number, data: PATCHMedicalResultDiseaseRequestDto): Promise<MedicalResultDisease> {
    const currentDisease = await this.diseaseRepository.findOneAndUpdate({ id: disease }, data);
    return currentDisease;
  }

  /**
   * Encuentra un resultado medico y retira una morbilidad.
   * @param result
   * @param disease 
   * @param data 
   */
  async findOneResultAndRemoveDisease(_: number, disease: number): Promise<void> {
    await this.diseaseRepository.findOneAndDelete({ id: disease });
  }

  /**
   * Encuentra un resultado medico y le asigna un archivo.
   * @param id 
   * @param file 
   * @returns 
   */
  async findOneResultAndUploadFile(id: number, file: Express.Multer.File): Promise<MedicalResult> {
    const { order, examName } = await this.repository.findOne({ where: { id }, relations: { order: true } });
    const medicalResultPath = fileResultPath({ dni: order.client.dni, order: order.id });
    const extension = extname(file.originalname);
    const filePath = await this.storageManager.saveFile(file.buffer, extension, medicalResultPath, examName.toLocaleLowerCase().replace(/\s/g, '_'));
    const result = await this.repository.findOneAndUpdate({ id }, { filePath: filePath, hasFile: true });
    return result;
  }

  /**
   * Añade un reporte medico a un resultado medico.
   * @param id 
   * @param param1 
   * @returns 
   */
  async insertMedicalReport(id: number, { ...data }: PATCHMedicalReportRequestDto): Promise<MedicalResult> {
    const medicalResult = await this.repository.findOne({
      where: { id },
      relations: {
        order: true
      }
    });
    const { order } = medicalResult;
    const { client } = order;
    const medicalReport = await this.reportService.create({
      content: data.content,
      order: order.id,
      companyName: order.companyName,
      patientDni: client.dni,
      patientBirthday: client.birthday,
      patientFullname: client.fullname,
      examName: medicalResult.examName,
      doctorDni: medicalResult.doctorDni,
      doctorFullname: medicalResult.doctorFullname,
      doctorSignature: medicalResult.doctorSignature,
    });
    await this.repository.findOneAndUpdate({ id }, { report: medicalReport });
    medicalResult.report = medicalReport;
    return medicalResult;
  }

  /**
   * Añade un atributo de envio a un resultado medico.
   * @param id 
   * @param value 
   * @returns 
   */
  async assignSendAttribute(id: number, value: string): Promise<MedicalResult> {
    const attribute = await this.attributeService.create({ value: value });
    const { sendAttributes } = await this.repository.findOne({ where: { id: id }, relations: { sendAttributes: true } });
    sendAttributes.concat(attribute);
    const report = await this.repository.findOneAndUpdate({ id: id }, { sendAttributes: sendAttributes });
    return report;
  }
}
