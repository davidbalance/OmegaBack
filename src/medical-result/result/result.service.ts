import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { ResultRepository } from './result.repository';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { MedicalReportService } from '../medical-report/medical-report.service';
import { Result } from './entities/result.entity';
import { ResultSendAttributeService } from './result-send-attribute/result-send-attribute.service';
import { StorageManager } from '@/shared/storage-manager';
import { FindFilePathService } from '@/shared';

@Injectable()
export class ResultService implements FindFilePathService<number> {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository,
    @Inject(MedicalReportService) private readonly reportService: MedicalReportService,
    @Inject(ResultSendAttributeService) private readonly attributeService: ResultSendAttributeService
  ) { }


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
   * Finds all the results
   * @returns Array of Result
   */
  async find(): Promise<Result[]> {
    const results = await this.repository.find({
      select: {
        id: true,
        examName: true,
        diseaseId: true,
        diseaseName: true,
        report: {
          id: true,
          content: true
        },
        order: {
          patientFullname: true
        }
      },
      relations: {
        order: true
      }
    });
    return results;
  }

  /**
   * Finds all the results associated to a doctor
   * @param doctor 
   * @returns Result
   */
  async findResultsByDoctor(doctor: string): Promise<Result[]> {
    const results = await this.repository.find({
      where: { doctorDni: doctor },
      select: {
        id: true,
        examName: true,
        diseaseId: true,
        diseaseName: true,
        report: {
          id: true,
          content: true
        },
        order: {
          patientFullname: true
        }
      },
      relations: {
        order: true
      }
    });

    return results;
  }

  /**
   * Find one result and assing a disease
   * @param id 
   * @param param1 
   * @returns Result
   */
  async findOneResultAndUpdateDisease(id: number, { ...data }: FindOneResultAndUpdateDiseaseRequestDTO): Promise<Result> {
    const result = await this.repository.findOneAndUpdate({ id }, { ...data });
    return result;
  }

  /**
   * Creates a new report and associate it to the given result
   * @param id 
   * @param param1 
   * @returns Result
   */
  async insertMedicalReport(id: number, { ...data }: InsertMedicalReportRequestDTO): Promise<Result> {
    const medicalResult = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        examName: true,
        doctorDni: true,
        doctorFullname: true,
        doctorSignature: true,
        order: {
          id: true,
          companyName: true,
          patientDni: true,
          patientFullname: true,
          patientBirthday: true
        }
      },
      relations: {
        order: true
      }
    });
    const medicalReport = await this.reportService.create({
      content: data.content,
      order: medicalResult.order.id,
      companyName: medicalResult.order.companyName,
      doctorDni: medicalResult.doctorDni,
      doctorFullname: medicalResult.doctorFullname,
      doctorSignature: medicalResult.doctorSignature,
      patientBirthday: medicalResult.order.patientBirthday,
      patientDni: medicalResult.order.patientDni,
      patientFullname: medicalResult.order.patientFullname,
      examName: medicalResult.examName,
    });
    await this.repository.findOneAndUpdate({ id }, { report: medicalReport });
    medicalResult.report = medicalReport;
    return medicalResult;
  }

  /**
   * Assign a send attribute to the result
   * @param id 
   * @param value 
   * @returns Result
   */
  async assignSendAttribute(id: number, value: string): Promise<Result> {
    const attribute = await this.attributeService.create({ value: value });
    const { sendAttributes } = await this.repository.findOne({ where: { id: id }, relations: { sendAttributes: true } });
    sendAttributes.concat(attribute);
    const report = await this.repository.findOneAndUpdate({ id: id }, { sendAttributes: sendAttributes });
    return report;
  }
}
