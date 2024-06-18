import { MedicalReportService } from "@/medical-result/medical-report/medical-report.service";
import { FindFilePathService } from "@/shared";
import { Injectable, Inject } from "@nestjs/common";
import { SendAttributeService } from "../send-attribute/send-attribute.service";
import { MedicalResultRepository } from "../medical-result.repository";
import { MedicalResult } from "../entities/result.entity";
import { PATCHMedicalResultWithDiseaseRequestDTO, POSTMedicalReportRequestDTO } from "@/medical-result/common/dtos/result.request.dto";

@Injectable()
export class MedicalResultService implements FindFilePathService<number> {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
    @Inject(MedicalReportService) private readonly reportService: MedicalReportService,
    @Inject(SendAttributeService) private readonly attributeService: SendAttributeService
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

  async find(): Promise<MedicalResult[]> {
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

  async findResultsByDoctor(doctor: string): Promise<MedicalResult[]> {
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

  async findOneResultAndUpdateDisease(id: number, { ...data }: PATCHMedicalResultWithDiseaseRequestDTO): Promise<MedicalResult> {
    const result = await this.repository.findOneAndUpdate({ id }, { ...data });
    return result;
  }

  async insertMedicalReport(id: number, { ...data }: POSTMedicalReportRequestDTO): Promise<MedicalResult> {
    const medicalResult = await this.repository.findOne({
      where: { id },
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

  async assignSendAttribute(id: number, value: string): Promise<MedicalResult> {
    const attribute = await this.attributeService.create({ value: value });
    const { sendAttributes } = await this.repository.findOne({ where: { id: id }, relations: { sendAttributes: true } });
    sendAttributes.concat(attribute);
    const report = await this.repository.findOneAndUpdate({ id: id }, { sendAttributes: sendAttributes });
    return report;
  }
}
