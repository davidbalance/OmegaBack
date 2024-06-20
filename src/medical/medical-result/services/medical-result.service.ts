import { FindFilePathService } from "@/shared";
import { Injectable, Inject } from "@nestjs/common";
import { SendAttributeService } from "../send-attribute/send-attribute.service";
import { MedicalResultRepository } from "../medical-result.repository";
import { MedicalResult } from "../entities/result.entity";
import { MedicalReportService } from "@/medical/medical-report/medical-report.service";
import { PATCHMedicalResultWithDiseaseRequestDto } from "../dtos/medical-result.request.dto";
import { PATCHMedicalReportRequestDto, POSTMedicalReportRequestDto } from "@/medical/medical-report/dtos/medical-report.request.dto";

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
        }
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
        }
      }
    });

    return results;
  }

  async findOneResultAndUpdateDisease(id: number, { ...data }: PATCHMedicalResultWithDiseaseRequestDto): Promise<MedicalResult> {
    const result = await this.repository.findOneAndUpdate({ id }, { ...data });
    return result;
  }

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

  async assignSendAttribute(id: number, value: string): Promise<MedicalResult> {
    const attribute = await this.attributeService.create({ value: value });
    const { sendAttributes } = await this.repository.findOne({ where: { id: id }, relations: { sendAttributes: true } });
    sendAttributes.concat(attribute);
    const report = await this.repository.findOneAndUpdate({ id: id }, { sendAttributes: sendAttributes });
    return report;
  }
}
